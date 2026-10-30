import { NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { checkAdminAuth, verifyCsrfOrigin } from '@/lib/adminAuth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { writeFileSync } from 'fs';

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

/**
 * DELETE /api/admin/submissions
 * Body: { submissionId, action: 'reject' | 'delete' }
 */
export async function DELETE(request) {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden: Invalid request origin.' }, { status: 403 });
  }

  const session = checkAdminAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Studio Lead session required.' }, { status: 401 });
  }

  try {
    const { submissionId, action = 'reject' } = await request.json();
    if (!submissionId) {
      return NextResponse.json({ error: 'Submission ID is required.' }, { status: 400 });
    }

    let deletedOrUpdated = false;

    // 1. Supabase update / deletion
    if (isSupabaseConfigured() && supabase) {
      try {
        if (action === 'delete') {
          const { error } = await supabase.from('submissions').delete().eq('id', submissionId);
          if (!error) deletedOrUpdated = true;
        } else {
          // Reject/Archive
          const { error } = await supabase
            .from('submissions')
            .update({ status: 'REJECTED' })
            .eq('id', submissionId);
          if (!error) deletedOrUpdated = true;
        }
      } catch (err) {
        console.warn('[Admin Submissions DELETE] Supabase error:', err.message);
      }
    }

    // 2. Local fallback update / deletion
    const localPath = getSubmissionsPath();
    if (existsSync(localPath)) {
      try {
        const raw = readFileSync(localPath, 'utf-8');
        let subs = JSON.parse(raw);
        if (action === 'delete') {
          subs = subs.filter((s) => s.id !== submissionId);
        } else {
          const target = subs.find((s) => s.id === submissionId);
          if (target) target.status = 'REJECTED';
        }
        writeFileSync(localPath, JSON.stringify(subs, null, 2) + '\n', 'utf-8');
        deletedOrUpdated = true;
      } catch {}
    }

    return NextResponse.json({
      success: true,
      message: action === 'delete' ? 'Submission permanently deleted.' : 'Submission archived/rejected.',
      submissionId,
    });
  } catch (err) {
    console.error('[Admin Submissions DELETE] Error:', err);
    return NextResponse.json({ error: 'Failed to process submission action.' }, { status: 500 });
  }
}
