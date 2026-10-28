import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { checkAdminAuth } from '@/lib/adminAuth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function getSubmissionsPath() {
  const rootData = join(process.cwd(), 'data', 'submissions.json');
  const parentData = join(process.cwd(), '..', 'data', 'submissions.json');
  return existsSync(rootData) ? rootData : parentData;
}

export async function GET() {
  const session = checkAdminAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Studio Lead session required.' }, { status: 401 });
  }

  // 1. Try Supabase first if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        // Map database column names to camelCase for client compatibility
        const mappedSubmissions = data.map((row) => ({
          id: row.id,
          name: row.name,
          leadBuilder: row.lead_builder,
          contact: row.contact,
          squadUrl: row.squad_url,
          skillSphereUrl: row.skill_sphere_url,
          skillSphereLabel: row.skill_sphere_label,
          category: row.category,
          track: row.track,
          tagline: row.tagline,
          description: row.description,
          techStack: row.tech_stack || [],
          repoUrl: row.repo_url,
          demoUrl: row.demo_url,
          submittedAt: row.submitted_at,
          status: row.status,
          approvedAt: row.approved_at,
        }));

        return NextResponse.json({
          success: true,
          submissions: mappedSubmissions,
          total: mappedSubmissions.length,
          source: 'supabase',
        });
      } else if (error) {
        console.warn('[Admin Submissions] Supabase query failed, falling back to local files:', error.message);
      }
    } catch (err) {
      console.warn('[Admin Submissions] Supabase exception, falling back to local files:', err.message);
    }
  }

  // 2. Fallback to local files if Supabase is unavailable
  let submissions = [];
  const localPath = getSubmissionsPath();
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
    source: 'local',
  });
}
