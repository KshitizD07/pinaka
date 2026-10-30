import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// This route reads query params at request time — must be dynamic
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

function getProjectsPath() {
  const rootData = join(process.cwd(), 'data', 'projects.json');
  const parentData = join(process.cwd(), '..', 'data', 'projects.json');
  return existsSync(rootData) ? rootData : parentData;
}

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

    let projects = [];

    // 1. Try Supabase first if configured
    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase.from('projects').select('*').order('created_at', { ascending: false });

        if (track) query = query.eq('track', track);
        if (status) query = query.eq('status', status);
        if (category) query = query.eq('category', category);

        const { data, error } = await query;
        if (!error && Array.isArray(data) && data.length > 0) {
          projects = data.map((row) => ({
            id: row.id,
            name: row.name,
            tagline: row.tagline,
            description: row.description,
            category: row.category,
            track: row.track,
            status: row.status,
            leadBuilder: row.lead,
            contact: row.contact,
            repoUrl: row.repo_url,
            demoUrl: row.demo_url,
            highlights: typeof row.highlights === 'string' ? row.highlights.split('\n').filter(Boolean) : row.highlights,
            techStack: row.tech_stack || [],
            squadUrl: row.squad_url,
            skillSphereUrl: row.skill_sphere_url,
          }));
        }
      } catch (sbErr) {
        console.warn('[API /projects] Supabase fetch error, fallback to local:', sbErr.message);
      }
    }

    // 2. If Supabase returned no projects or not configured, load from local projects.json
    if (projects.length === 0) {
      const filePath = getProjectsPath();
      if (existsSync(filePath)) {
        const raw = readFileSync(filePath, 'utf-8');
        projects = JSON.parse(raw);

        if (track) {
          projects = projects.filter((p) => p.track === track);
        }
        if (status) {
          projects = projects.filter((p) => p.status === status);
        }
        if (category) {
          projects = projects.filter((p) => p.category === category);
        }
      }
    }

    // 3. In-memory fuzzy filter for search
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

    return NextResponse.json({ projects, total: projects.length }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'CDN-Cache-Control': 'no-store',
        'Vercel-CDN-Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('[API /projects] Error:', err);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}
