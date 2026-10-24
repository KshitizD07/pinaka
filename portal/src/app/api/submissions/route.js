import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { sendCandidateNotificationEmail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      leadBuilder,
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

    const submissionId = `PINAKA-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const submission = {
      id: submissionId,
      name: name.trim(),
      leadBuilder: leadBuilder.trim(),
      contact: contact.trim(),
      category: category || 'Campus Tech',
      track: track || 'incubating',
      tagline: tagline.trim(),
      description: description.trim(),
      techStack: Array.isArray(techStack)
        ? techStack
        : typeof techStack === 'string'
        ? techStack.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      repoUrl: repoUrl?.trim() || null,
      demoUrl: demoUrl?.trim() || null,
      submittedAt: new Date().toISOString(),
      status: 'UNDER_REVIEW',
    };

    // Attempt to persist to data/submissions.json (writable locally, fallback on /tmp)
    try {
      const submissionsPath = join(process.cwd(), '..', 'data', 'submissions.json');
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
    } catch (fsErr) {
      console.warn('[Submissions] Non-fatal filesystem notice on serverless:', fsErr.message);
      try {
        const tmpPath = join('/tmp', 'pinaka_submissions.json');
        let tmpSubs = [];
        if (existsSync(tmpPath)) {
          tmpSubs = JSON.parse(readFileSync(tmpPath, 'utf-8'));
        }
        tmpSubs.unshift(submission);
        writeFileSync(tmpPath, JSON.stringify(tmpSubs, null, 2), 'utf-8');
      } catch {
        // Safe no-op on ephemeral containers
      }
    }

    // Trigger instant email notification to the studio lead via SMTP
    sendCandidateNotificationEmail(submission).catch((err) => {
      console.error('[Submissions] Background email error:', err);
    });

    return NextResponse.json({
      success: true,
      submissionId,
      message: 'Project candidate successfully submitted for Pinaka Foundry evaluation.',
      submission,
    });
  } catch (err) {
    console.error('[API /submissions] Error:', err);
    return NextResponse.json(
      { error: 'Failed to process project candidate submission.' },
      { status: 500 }
    );
  }
}
