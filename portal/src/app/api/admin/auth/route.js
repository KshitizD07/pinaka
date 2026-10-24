import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const ADMIN_COOKIE_NAME = 'pinaka_admin_session';

export async function POST(request) {
  try {
    const { key } = await request.json();
    const expectedKey = process.env.PINAKA_ADMIN_KEY || 'pinaka2026';

    if (!key || key.trim() !== expectedKey.trim()) {
      return NextResponse.json(
        { success: false, error: 'Invalid Studio Lead passphrase.' },
        { status: 401 }
      );
    }

    const cookieStore = cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, 'authorized-kshitiz-lead', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return NextResponse.json({
      success: true,
      lead: 'KSHITIZ',
      message: 'Authenticated as Studio Lead',
    });
  } catch (err) {
    console.error('[API /admin/auth POST] Error:', err);
    return NextResponse.json({ error: 'Authentication failed.' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(ADMIN_COOKIE_NAME);
    const isAuthenticated = token?.value === 'authorized-kshitiz-lead';

    return NextResponse.json({
      authenticated: isAuthenticated,
      lead: isAuthenticated ? 'KSHITIZ' : null,
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
