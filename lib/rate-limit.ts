// Naive in-memory rate limiter — fine for a single serverless instance /
// low traffic. Replace with a shared store (Upstash Redis, etc.) once
// deployed behind multiple instances, or move this into middleware.
const buckets = new Map<string, number[]>();

export function isRateLimited(
  key: string,
  { windowMs, max }: { windowMs: number; max: number }
): boolean {
  const now = Date.now();
  const timestamps = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  timestamps.push(now);
  buckets.set(key, timestamps);
  return timestamps.length > max;
}
