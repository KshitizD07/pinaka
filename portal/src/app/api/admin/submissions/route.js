import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { checkAdminAuth } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = checkAdminAuth();
  if (!session) {
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
