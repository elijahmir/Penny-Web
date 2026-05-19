import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const AGENT_ID = process.env.NEXT_PUBLIC_ELEVENLABS_CHAT_AGENT_ID!;
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY!;
const DAILY_SESSION_CAP = parseInt(process.env.CHAT_DAILY_SESSION_CAP ?? "5", 10);

function hashIp(ip: string): string {
  return createHash("sha256").update(ip + "penny-chat-salt").digest("hex").slice(0, 32);
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  // --- Rate limit check ---
  const ip = getIp(req);
  const ipHash = hashIp(ip);
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  const { count, error: countError } = await supabase
    .from("chat_sessions")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  if (countError) {
    console.error("[chat-session] Supabase count error:", countError);
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  if ((count ?? 0) >= DAILY_SESSION_CAP) {
    return NextResponse.json(
      {
        error: "rate_limited",
        message: `You've had ${DAILY_SESSION_CAP} Penny Chat sessions today. Come back tomorrow to try again, or book a real demo below.`,
      },
      { status: 429 }
    );
  }

  // --- Get signed URL from ElevenLabs ---
  if (!ELEVENLABS_API_KEY || !AGENT_ID) {
    return NextResponse.json({ error: "Chat demo not configured" }, { status: 503 });
  }

  const elevenRes = await fetch(
    `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${AGENT_ID}`,
    { headers: { "xi-api-key": ELEVENLABS_API_KEY } }
  );

  if (!elevenRes.ok) {
    console.error("[chat-session] ElevenLabs signed URL error:", await elevenRes.text());
    return NextResponse.json({ error: "Could not initialise chat session" }, { status: 502 });
  }

  const { signed_url: signedUrl } = await elevenRes.json();

  // --- Log session to Supabase ---
  const { error: insertError } = await supabase.from("chat_sessions").insert({
    ip_hash: ipHash,
    agent_id: AGENT_ID,
  });

  if (insertError) {
    console.error("[chat-session] Supabase insert error:", insertError);
    // Non-fatal - continue anyway
  }

  return NextResponse.json({ signedUrl, agentId: AGENT_ID });
}
