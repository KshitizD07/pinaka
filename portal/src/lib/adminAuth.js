import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'pinaka_admin_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret() {
  const secret = process.env.PINAKA_ADMIN_SECRET || process.env.PINAKA_ADMIN_KEY;
  return secret || null;
}

/**
 * Creates a cryptographically signed session token with expiry and unique nonce.
 * Format: base64url(payload).signature
 */
export function createAdminSessionToken(leadName = 'KSHITIZ') {
  const secret = getSecret();
  if (!secret) {
    throw new Error('Server secret is missing for session generation.');
  }

  const now = Date.now();
  const payload = {
    sub: leadName,
    iat: now,
    exp: now + SESSION_DURATION_MS,
    nonce: randomBytes(16).toString('hex'),
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  return {
    token: `${payloadB64}.${signature}`,
    maxAgeSeconds: Math.floor(SESSION_DURATION_MS / 1000),
    payload,
  };
}

/**
 * Validates the admin session cookie against the HMAC signature and timestamp expiry.
 */
export function verifyAdminSession(token) {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [payloadB64, signature] = parts;
  const secret = getSecret();
  if (!secret) return null;

  const expectedSignature = createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  const sigBuf = Buffer.from(signature);
  const expectedSigBuf = Buffer.from(expectedSignature);

  if (sigBuf.length !== expectedSigBuf.length) return null;
  if (!timingSafeEqual(sigBuf, expectedSigBuf)) return null;

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf-8'));
    if (!payload.exp || Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Validates request Origin/Host to prevent Cross-Site Request Forgery (CSRF)
 * on mutating state actions.
 */
export function verifyCsrfOrigin(request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  // If origin header is present, ensure host matches
  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.host !== host) {
        return false;
      }
    } catch {
      return false;
    }
  }

  // Fallback to checking referer header if origin is missing
  if (!origin) {
    const referer = request.headers.get('referer');
    if (referer && host) {
      try {
        const refUrl = new URL(referer);
        if (refUrl.host !== host) {
          return false;
        }
      } catch {
        return false;
      }
    }
  }

  return true;
}

/**
 * Convenience helper to verify session from incoming request cookies.
 */
export function checkAdminAuth() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSession(sessionToken);
}
