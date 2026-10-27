import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  checkAdminAuth,
} from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { key } = await request.json();
    const expectedKey = process.env.PINAKA_ADMIN_KEY;

    if (!expectedKey) {
      console.error('[API /admin/auth POST] PINAKA_ADMIN_KEY environment variable is not configured.');
      return NextResponse.json(
        { success: false, error: 'Admin authentication is misconfigured on the server.' },
        { status: 500 }
      );
    }

    if (!key || key.trim() !== expectedKey.trim()) {
      return NextResponse.json(
        { success: false, error: 'Invalid Studio Lead passphrase.' },
        { status: 401 }
      );
    }

    const { token, maxAgeSeconds, payload } = createAdminSessionToken('KSHITIZ');

    const cookieStore = cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: maxAgeSeconds,
    });

    return NextResponse.json({
      success: true,
      lead: payload.sub,
      message: 'Authenticated as Studio Lead',
    });
  } catch (err) {
    console.error('[API /admin/auth POST] Error:', err);
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = checkAdminAuth();
    const isAuthenticated = !!session;

    return NextResponse.json({
      authenticated: isAuthenticated,
      lead: isAuthenticated ? session.sub : null,
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Logout failed.' }, { status: 500 });
  }
}
