import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/features/demo/rate-limit";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY;
const N8N_WEBHOOK_URL = process.env.N8N_CONTACT_WEBHOOK_URL;

const contactSchema = z.object({
  name: z.string().min(2, "Name required.").max(60),
  phone: z
    .string()
    .min(8, "Enter a valid phone number.")
    .max(20)
    .regex(/^[+\d\s()-]+$/, "Enter a valid phone number."),
  email: z.string().email("Enter a valid email.").max(254),
  message: z.string().min(10, "Give us a bit more detail.").max(500),
  captchaToken: z.string().min(1, "Please complete the security check."),
});

/**
 * Verify Cloudflare Turnstile CAPTCHA token.
 */
async function verifyCaptcha(token: string, ip: string): Promise<boolean> {
  if (!TURNSTILE_SECRET) return true; // skip in dev if not configured

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: TURNSTILE_SECRET,
        response: token,
        remoteip: ip,
      }),
    }
  );

  const data = await res.json();
  return data.success === true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("cf-connecting-ip") ||
      "unknown";

    /* ── 1. Rate limiting: 3 per IP per hour ──────── */
    const limit = rateLimit(`contact:ip:${ip}`, 3, 60 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error:
            "Too many submissions from this address. Please try again later.",
          code: "rate_limit",
        },
        { status: 429 }
      );
    }

    /* ── 2. Parse + validate body ─────────────────── */
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Invalid input.";
      return NextResponse.json(
        { error: firstError, code: "validation_error" },
        { status: 400 }
      );
    }

    const { name, email, phone, message, captchaToken } = parsed.data;

    /* ── 3. CAPTCHA verification ──────────────────── */
    if (TURNSTILE_SECRET) {
      const captchaOk = await verifyCaptcha(captchaToken, ip);
      if (!captchaOk) {
        return NextResponse.json(
          {
            error: "CAPTCHA verification failed. Please try again.",
            code: "captcha_failed",
          },
          { status: 403 }
        );
      }
    }

    /* ── 4. Forward to n8n webhook ────────────────── */
    if (!N8N_WEBHOOK_URL) {
      console.error("[contact] N8N_CONTACT_WEBHOOK_URL not configured");
      return NextResponse.json(
        { error: "Contact form not configured.", code: "not_configured" },
        { status: 503 }
      );
    }

    const webhookRes = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        interest: message.trim(),
        notes: `Phone: ${phone.trim()}`,
        facility_name: "",
        source: "penny-contact-form",
      }),
    });

    if (!webhookRes.ok) {
      console.error(
        "[contact] Webhook error:",
        webhookRes.status,
        await webhookRes.text()
      );
      return NextResponse.json(
        {
          error: "Something went wrong. Try again or email us directly.",
          code: "webhook_error",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again.", code: "server_error" },
      { status: 500 }
    );
  }
}
