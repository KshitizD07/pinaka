/**
 * Lightweight sliding-window rate limiter.
 * Tracks request timestamps per key (e.g. client IP or identifier) and enforces max requests within windowMs.
 */
class MemoryRateLimiter {
  constructor() {
    this.hits = new Map();
    // Run cleanup every 5 minutes to avoid memory leaks
    if (typeof setInterval !== 'undefined') {
      const timer = setInterval(() => this.cleanup(), 5 * 60 * 1000);
      if (timer?.unref) timer.unref();
    }
  }

  cleanup() {
    const now = Date.now();
    for (const [key, timestamps] of this.hits.entries()) {
      const valid = timestamps.filter((t) => now - t < 3600 * 1000);
      if (valid.length === 0) {
        this.hits.delete(key);
      } else {
        this.hits.set(key, valid);
      }
    }
  }

  /**
   * Check if a key is rate limited.
   * @param {string} key Identifier (e.g., client IP)
   * @param {number} maxRequests Maximum requests allowed within window
   * @param {number} windowMs Time window in milliseconds
   * @returns {{ allowed: boolean, remaining: number, retryAfterSeconds: number }}
   */
  check(key, maxRequests = 5, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    const timestamps = (this.hits.get(key) || []).filter((t) => now - t < windowMs);

    if (timestamps.length >= maxRequests) {
      const oldestInWindow = timestamps[0];
      const retryAfterSeconds = Math.max(1, Math.ceil((oldestInWindow + windowMs - now) / 1000));
      return {
        allowed: false,
        remaining: 0,
        retryAfterSeconds,
      };
    }

    timestamps.push(now);
    this.hits.set(key, timestamps);

    return {
      allowed: true,
      remaining: maxRequests - timestamps.length,
      retryAfterSeconds: 0,
    };
  }

  reset(key) {
    this.hits.delete(key);
  }
}

// Global singleton across serverless warm executions
const globalForLimiter = globalThis;
if (!globalForLimiter.adminAuthLimiter) {
  globalForLimiter.adminAuthLimiter = new MemoryRateLimiter();
}

export const adminAuthLimiter = globalForLimiter.adminAuthLimiter;

export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp.trim();
  }
  return '127.0.0.1';
}
