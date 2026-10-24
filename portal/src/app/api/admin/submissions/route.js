import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-dynamic';

function checkAuth() {
  const cookieStore = cookies();
  const token = cookieStore.get('pinaka_admin_session');
  return token?.value === 'authorized-kshitiz-lead';
}

export async function GET() {
  if (!checkAuth()) {
    return NextResponse.json({ error: 'Unauthorized. Studio Lead session required.' }, { status: 401 });
  }

  let submissions = [];
  const localPath = join(process.cwd(), '..', 'data', 'submissions.json');
  const tmpPath = join('/tmp', 'pinaka_submissions.json');

  if (existsSync(localPath)) {
    try {
      submissions = JSON.parse(readFileSync(localPath, 'utf-8'));
    } catch {}
  } else if (existsSync(tmpPath)) {
    try {
      submissions = JSON.parse(readFileSync(tmpPath, 'utf-8'));
    } catch {}
  }

  return NextResponse.json({
    success: true,
    submissions,
    total: submissions.length,
  });
}
