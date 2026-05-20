import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js Proxy — runs on every matching request before routes.
 * Sets a `geo-country` cookie from Vercel's IP geolocation header
 * so the client can pre-select the correct country dial code.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Vercel injects this header automatically on their edge network.
  // Falls back to empty string in local dev (handled by client-side timezone detection).
  const country =
    request.headers.get("x-vercel-ip-country") ?? "";

  if (country) {
    response.cookies.set("geo-country", country, {
      httpOnly: false,       // Client JS needs to read this
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,  // 24 hours — refresh on next visit
      path: "/",
    });
  }

  return response;
}

/**
 * Only run proxy on page routes (not API, static assets, etc.)
 * to avoid unnecessary cookie-setting on every fetch.
 */
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|woff2?|ttf|otf|ico)).*)",
  ],
};
