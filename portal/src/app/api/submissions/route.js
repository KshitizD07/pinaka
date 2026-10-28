import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { sendCandidateNotificationEmail } from '@/lib/mailer';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function getSubmissionsPath() {
  const rootData = join(process.cwd(), 'data', 'submissions.json');
  const parentData = join(process.cwd(), '..', 'data', 'submissions.json');
  return existsSync(rootData) ? rootData : parentData;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      leadBuilder,
      squadUrl,
      skillSphereUrl,
      skillSphereLabel,
      contact,
      category,
      track,
      tagline,
      description,
      techStack,
      repoUrl,
      demoUrl,
    } = body;

    // Basic validation
    if (!name?.trim()) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }
    if (!leadBuilder?.trim()) {
      return NextResponse.json({ error: 'Lead builder name or handle is required' }, { status: 400 });
    }
    if (!contact?.trim()) {
      return NextResponse.json({ error: 'Contact email or handle is required' }, { status: 400 });
    }
    if (!tagline?.trim()) {
      return NextResponse.json({ error: 'A concise tagline is required' }, { status: 400 });
    }
    if (!description?.trim()) {
      return NextResponse.json({ error: 'Problem brief / description is required' }, { status: 400 });
    }
    if ((track === 'proposals' || track === 'incubating') && !squadUrl?.trim()) {
      return NextResponse.json({ error: 'A SkillSphere Squad URL is mandatory for Ongoing Work and Proposals.' }, { status: 400 });
    }

    const submissionId = `PINAKA-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const normalizedTechStack = Array.isArray(techStack)
      ? techStack
      : typeof techStack === 'string'
      ? techStack.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const submission = {
      id: submissionId,
      name: name.trim(),
      leadBuilder: leadBuilder.trim(),
      contact: contact.trim(),
      squadUrl: squadUrl?.trim() || null,
      skillSphereUrl: skillSphereUrl?.trim() || null,
      skillSphereLabel: skillSphereLabel?.trim() || null,
      category: category || 'Campus Tech',
      track: track || 'incubating',
      tagline: tagline.trim(),
      description: description.trim(),
      techStack: normalizedTechStack,
      repoUrl: repoUrl?.trim() || null,
      demoUrl: demoUrl?.trim() || null,
      submittedAt: new Date().toISOString(),
      status: 'UNDER_REVIEW',
    };

    let persisted = false;
    let persistenceErrors = [];

    // 1. Supabase Persistence (Primary)
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error: dbErr } = await supabase.from('submissions').insert([
          {
            id: submission.id,
            name: submission.name,
            lead_builder: submission.leadBuilder,
            contact: submission.contact,
            squad_url: submission.squadUrl,
            skill_sphere_url: submission.skillSphereUrl,
            skill_sphere_label: submission.skillSphereLabel,
            category: submission.category,
            track: submission.track,
            tagline: submission.tagline,
            description: submission.description,
            tech_stack: submission.techStack,
            repo_url: submission.repoUrl,
            demo_url: submission.demoUrl,
            submitted_at: submission.submittedAt,
            status: submission.status,
          },
        ]);

        if (dbErr) {
          persistenceErrors.push(`Supabase: ${dbErr.message}`);
          console.error('[Submissions] Supabase insert error:', dbErr);
        } else {
          persisted = true;
          console.log(`[Submissions] Successfully saved ${submission.id} to Supabase.`);
        }
      } catch (err) {
        persistenceErrors.push(`Supabase exception: ${err.message}`);
        console.error('[Submissions] Supabase exception:', err);
      }
    }

    // 2. Local / Serverless filesystem logging (Fallback / Local dev mirror)
    try {
      const submissionsPath = getSubmissionsPath();
      let submissions = [];
      if (existsSync(submissionsPath)) {
        try {
          const raw = readFileSync(submissionsPath, 'utf-8');
          submissions = JSON.parse(raw);
        } catch {
          submissions = [];
        }
      }
      submissions.unshift(submission);
      writeFileSync(submissionsPath, JSON.stringify(submissions, null, 2), 'utf-8');
      persisted = true;
    } catch (fsErr) {
      persistenceErrors.push(`Local filesystem: ${fsErr.message}`);
      try {
        const tmpPath = join('/tmp', 'pinaka_submissions.json');
        let tmpSubs = [];
        if (existsSync(tmpPath)) {
          tmpSubs = JSON.parse(readFileSync(tmpPath, 'utf-8'));
        }
        tmpSubs.unshift(submission);
        writeFileSync(tmpPath, JSON.stringify(tmpSubs, null, 2), 'utf-8');
        persisted = true;
      } catch (tmpErr) {
        persistenceErrors.push(`Tmp filesystem: ${tmpErr.message}`);
      }
    }

    // Ensure submission was persisted in at least one durable target
    if (!persisted) {
      console.error('[Submissions] All persistence strategies failed:', persistenceErrors.join(' | '));
      return NextResponse.json(
        { error: 'Failed to record submission. Please retry later or contact the studio lead directly.' },
        { status: 500 }
      );
    }

    // 3. Dispatch notification email
    const emailResult = await sendCandidateNotificationEmail(submission);
    if (!emailResult?.success) {
      console.warn('[Submissions] Notification email not dispatched:', emailResult?.error || emailResult?.reason);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message: 'Project candidate successfully submitted for Pinaka Foundry evaluation.',
      submission,
      emailNotified: Boolean(emailResult?.success),
    });
  } catch (err) {
    console.error('[API /submissions] Error:', err);
    return NextResponse.json(
      { error: 'Failed to process project candidate submission.' },
      { status: 500 }
    );
  }
}
