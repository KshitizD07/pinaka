import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

// This route reads query params at request time — must be dynamic
export const dynamic = 'force-dynamic';

/**
 * GET /api/projects
 * Query params: track, status, category, search
 * Returns: { projects: [...], total: number }
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const track = searchParams.get('track');
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

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
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      projects = projects.filter((p) => {
        const inName = p.name?.toLowerCase().includes(q);
        const inTagline = p.tagline?.toLowerCase().includes(q);
        const inDesc = p.description?.toLowerCase().includes(q);
        const inCategory = p.category?.toLowerCase().includes(q);
        const inLead = p.leadBuilder?.toLowerCase().includes(q);
        const inStack = Array.isArray(p.techStack) && p.techStack.some((t) => t.toLowerCase().includes(q));
        const inHighlights = Array.isArray(p.highlights) && p.highlights.some((h) => h.toLowerCase().includes(q));
        return inName || inTagline || inDesc || inCategory || inLead || inStack || inHighlights;
      });
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
