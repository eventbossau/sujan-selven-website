const buckets = new Map();

/**
 * Simple in-memory rate limit. Returns true if the request is allowed.
 * @param {string} key
 * @param {{ limit?: number; windowMs?: number }} [opts]
 */
export function rateLimit(key, { limit = 8, windowMs = 60_000 } = {}) {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count += 1;
  return bucket.count <= limit;
}

export function clientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export function json(data, status = 200) {
  return Response.json(data, { status });
}
