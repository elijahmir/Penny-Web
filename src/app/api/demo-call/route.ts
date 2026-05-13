import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, dailyQuotaCheck } from "@/lib/rate-limit";
import { validatePhone } from "@/lib/phone";

const bodySchema = z.object({
  name: z.string().min(2).max(60),
  phone: z.string(),
  scenario: z.string().min(1),
  turnstile_token: z.string().min(1),
});

const DAILY_DEMO_LIMIT = 100;
const PER_PHONE_LIMIT = 2;
const PER_PHONE_WINDOW = 24 * 60 * 60 * 1000; // 24h

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Skip verification in dev

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  const data = await res.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bodySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation", message: "Invalid request." },
        { status: 400 }
      );
    }

    const { name, phone, scenario, turnstile_token } = parsed.data;

    // Verify CAPTCHA
    const captchaValid = await verifyTurnstile(turnstile_token);
    if (!captchaValid) {
      return NextResponse.json(
        { ok: false, error: "captcha_failed", message: "CAPTCHA failed." },
        { status: 403 }
      );
    }

    // Validate phone
    const phoneResult = validatePhone(phone);
    if (!phoneResult.valid || !phoneResult.e164) {
      return NextResponse.json(
        { ok: false, error: "invalid_phone", message: phoneResult.error },
        { status: 400 }
      );
    }

    // Rate limit: per-phone
    const phoneLimit = rateLimit(
      `demo:${phoneResult.e164}`,
      PER_PHONE_LIMIT,
      PER_PHONE_WINDOW
    );
    if (!phoneLimit.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "rate_limit",
          message: `Please wait ${phoneLimit.retryAfterSeconds}s before trying again.`,
        },
        { status: 429 }
      );
    }

    // Daily quota
    const dailyCheck = dailyQuotaCheck("demo:global", DAILY_DEMO_LIMIT);
    if (!dailyCheck.allowed) {
      return NextResponse.json(
        {
          ok: false,
          error: "daily_quota_exhausted",
          message: "Daily demo limit reached.",
        },
        { status: 429 }
      );
    }

    // TODO: Trigger Retell AI call via API
    // For now, log the request and return success
    console.log("[demo-call]", {
      name,
      phone: phoneResult.e164,
      scenario,
      timestamp: new Date().toISOString(),
    });

    // TODO: Insert into Supabase penny_demo_calls table

    return NextResponse.json({
      ok: true,
      message: "Call initiated. Penny will ring you shortly.",
    });
  } catch (error) {
    console.error("[demo-call] Error:", error);
    return NextResponse.json(
      { ok: false, error: "internal", message: "Internal server error." },
      { status: 500 }
    );
  }
}
