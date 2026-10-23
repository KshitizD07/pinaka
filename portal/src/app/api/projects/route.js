import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// This route reads query params at request time — must be dynamic
export const dynamic = 'force-dynamic';

/**
 * GET /api/projects
 * Query params: track, status, category
 * Returns: { projects: [...], total: number }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const track = searchParams.get('track');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    // Read from monorepo root — portal/ is one level deep
    const filePath = join(process.cwd(), '..', 'data', 'projects.json');
    const raw = readFileSync(filePath, 'utf-8');
    let projects = JSON.parse(raw);

    if (track) {
      projects = projects.filter((p) => p.track === track);
    }
    if (status) {
      projects = projects.filter((p) => p.status === status);
    }
    if (category) {
      projects = projects.filter((p) => p.category === category);
    }

    return NextResponse.json({ projects, total: projects.length });
  } catch (err) {
    console.error('[API /projects] Error:', err);
    return NextResponse.json(
      { error: 'Failed to load projects', projects: [], total: 0 },
      { status: 500 }
    );
  }
}
