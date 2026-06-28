// Simple in-memory IP rate limiter. Resets on server restart — sufficient
// to throttle brute-force / registration spam. For multi-instance prod,
// swap the Map for an Upstash Redis handle (same surface).
const hits = new Map<string, { count: number; reset: number }>();

const WINDOW_MS = 60_000; // 1 minute
const MAX = 5; // 5 requests per window per IP

export function rateLimit(ip: string, max = MAX, windowMs = WINDOW_MS): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + windowMs });
    return true;
  }
  entry.count += 1;
  return entry.count <= max;
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]!.trim();
  return req.headers.get('x-real-ip') ?? 'unknown';
}
