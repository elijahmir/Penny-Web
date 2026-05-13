/**
 * Simple in-memory rate limiter.
 * For production, swap this with Upstash Redis.
 */

const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= limit) {
    const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  entry.count++;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function dailyQuotaCheck(
  dailyKey: string,
  maxPerDay: number
): { allowed: boolean } {
  const now = Date.now();
  const entry = store.get(dailyKey);

  if (!entry || now > entry.resetAt) {
    store.set(dailyKey, { count: 1, resetAt: now + 24 * 60 * 60 * 1000 });
    return { allowed: true };
  }

  if (entry.count >= maxPerDay) {
    return { allowed: false };
  }

  entry.count++;
  return { allowed: true };
}
