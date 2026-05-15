import { NextRequest, NextResponse } from "next/server";
import { SCENARIO_AGENT_MAP, type ScenarioId } from "@/features/demo/scenarios";
import { validatePhone } from "@/features/demo/phone";
import { rateLimit, dailyQuotaCheck } from "@/features/demo/rate-limit";
import { createServerClient } from "@/features/demo/supabase-server";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const RETELL_API_KEY = process.env.RETELL_API_KEY!;
const FROM_NUMBER = process.env.RETELL_DEMO_FROM_NUMBER || "+61485017999";
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
const DAILY_CAP = parseInt(process.env.DEMO_DAILY_CALL_CAP || "50", 10);

const VALID_SCENARIOS = new Set<string>(Object.keys(SCENARIO_AGENT_MAP));

/** Simple email format check (matches frontend) */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

/**
 * Verify Cloudflare Turnstile CAPTCHA token.
 */
async function verifyCaptcha(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true; // skip in dev if not configured

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: TURNSTILE_SECRET,
      response: token,
      remoteip: ip,
    }),
  });

  const data = await res.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("cf-connecting-ip") ||
      "unknown";

    const body = await request.json();
    const { name, email, phone, countryCode, scenario, marketingConsent, captchaToken } = body as {
      name: string;
      email: string;
      phone: string;
      countryCode: string;
      scenario: string;
      marketingConsent: boolean;
      captchaToken: string;
    };

    /* ── 1. Input validation ────────────────────────── */
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your first name.", code: "invalid_name" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address.", code: "invalid_email" },
        { status: 400 }
      );
    }

    if (!scenario || !VALID_SCENARIOS.has(scenario)) {
      return NextResponse.json(
        { error: "Please select a demo scenario.", code: "invalid_scenario" },
        { status: 400 }
      );
    }

    if (!countryCode || typeof countryCode !== "string" || countryCode.length !== 2) {
      return NextResponse.json(
        { error: "Please select a country code.", code: "invalid_country" },
        { status: 400 }
      );
    }

    /* ── 2. CAPTCHA verification (MANDATORY) ─────────── */
    if (TURNSTILE_SECRET) {
      if (!captchaToken) {
        return NextResponse.json(
          { error: "Please complete the security check.", code: "captcha_missing" },
          { status: 400 }
        );
      }
      const captchaOk = await verifyCaptcha(captchaToken, ip);
      if (!captchaOk) {
        return NextResponse.json(
          { error: "CAPTCHA verification failed. Please try again.", code: "captcha_failed" },
          { status: 403 }
        );
      }
    }

    /* ── 3. Phone validation ────────────────────────── */
    const phoneResult = validatePhone(phone, countryCode);
    if (!phoneResult.valid || !phoneResult.e164) {
      return NextResponse.json(
        { error: phoneResult.error || "Invalid phone number.", code: "invalid_phone" },
        { status: 400 }
      );
    }

    /* ── 4. Rate limiting ───────────────────────────── */
    const supabase = createServerClient();

    // Per-phone: 1 call per 24h (Database-backed)
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data: recentCalls, error: rateLimitError } = await supabase
      .from("penny_demo_calls")
      .select("id, created_at")
      .eq("phone", phoneResult.e164)
      .gte("created_at", twentyFourHoursAgo)
      .order("created_at", { ascending: false })
      .limit(1);

    if (rateLimitError) {
      console.error("[demo-call] DB rate limit check error:", rateLimitError);
    }

    if (recentCalls && recentCalls.length > 0) {
      const mostRecent = new Date(recentCalls[0].created_at).getTime();
      const retryAfterHours = Math.ceil((mostRecent + 24 * 60 * 60 * 1000 - Date.now()) / (1000 * 60 * 60));
      return NextResponse.json(
        {
          error: `This number already received a demo today. Try again in ${retryAfterHours} hours.`,
          code: "rate_limit",
        },
        { status: 429 }
      );
    }

    // Per-IP: 5 calls per hour
    const ipLimit = rateLimit(`demo:ip:${ip}`, 5, 60 * 60 * 1000);
    if (!ipLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many demo requests from this address. Please try again later.",
          code: "rate_limit",
        },
        { status: 429 }
      );
    }

    // Global daily quota
    const dailyCheck = dailyQuotaCheck("demo:daily:global", DAILY_CAP);
    if (!dailyCheck.allowed) {
      return NextResponse.json(
        {
          error: "We've reached the daily demo limit. Please try again tomorrow!",
          code: "daily_quota_exhausted",
        },
        { status: 429 }
      );
    }

    /* ── 5. Log to Supabase ─────────────────────────── */
    const { data: dbRow, error: dbError } = await supabase
      .from("penny_demo_calls")
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phoneResult.e164,
        scenario: scenario as ScenarioId,
        status: "initiating",
        ip_address: ip,
        marketing_consent: Boolean(marketingConsent),
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("[demo-call] Supabase insert error:", dbError);
      // Continue anyway - don't block the user if logging fails
    }

    /* ── 6. Trigger Retell outbound call ────────────── */
    const agentId = SCENARIO_AGENT_MAP[scenario as ScenarioId];

    const retellPayload = {
      from_number: FROM_NUMBER,
      to_number: phoneResult.e164,
      override_agent_id: agentId,
      retell_llm_dynamic_variables: {
        caller_name: name.trim(),
        caller_email: email.trim(),
        demo_call_id: dbRow?.id || "",
      },
    };

    const retellRes = await fetch("https://api.retellai.com/v2/create-phone-call", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(retellPayload),
    });

    const retellData = await retellRes.json();

    if (!retellRes.ok || retellData.error_message) {
      console.error("[demo-call] Retell API error:", retellData);

      // Update DB with error
      if (dbRow?.id) {
        await supabase
          .from("penny_demo_calls")
          .update({
            status: "failed",
            error_code: retellData.error_message || "retell_error",
          })
          .eq("id", dbRow.id);
      }

      return NextResponse.json(
        {
          error: "Unable to initiate the demo call right now. Please try again shortly.",
          code: "call_failed",
        },
        { status: 502 }
      );
    }

    /* ── 7. Update DB with Retell call ID ───────────── */
    if (dbRow?.id) {
      await supabase
        .from("penny_demo_calls")
        .update({
          status: "initiated",
          call_id: retellData.call_id,
        })
        .eq("id", dbRow.id);
    }

    return NextResponse.json({
      success: true,
      callId: retellData.call_id,
      message: `Penny will call you in a few seconds, ${name.trim()}!`,
    });
  } catch (err) {
    console.error("[demo-call] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again.", code: "server_error" },
      { status: 500 }
    );
  }
}
