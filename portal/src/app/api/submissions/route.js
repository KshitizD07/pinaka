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

    const submissionId = `PINAKA-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const submission = {
      id: submissionId,
      name: name.trim(),
      leadBuilder: leadBuilder.trim(),
      contact: contact.trim(),
      skillSphereUrl: skillSphereUrl?.trim() || null,
      skillSphereLabel: skillSphereLabel?.trim() || null,
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

    // 1. Local / Serverless filesystem logging
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
      try {
        const tmpPath = join('/tmp', 'pinaka_submissions.json');
        let tmpSubs = [];
        if (existsSync(tmpPath)) {
          tmpSubs = JSON.parse(readFileSync(tmpPath, 'utf-8'));
        }
        tmpSubs.unshift(submission);
        writeFileSync(tmpPath, JSON.stringify(tmpSubs, null, 2), 'utf-8');
      } catch {}
    }

    // 2. Git-Backed logging via GitHub API (if GITHUB_TOKEN configured)
    if (process.env.GITHUB_TOKEN) {
      try {
        const githubRepo = process.env.GITHUB_REPOSITORY || 'KshitizD07/pinaka';
        const getRes = await fetch(`https://api.github.com/repos/${githubRepo}/contents/data/submissions.json`, {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github.v3+json',
          },
        });

        if (getRes.ok) {
          const fileData = await getRes.json();
          const currentContent = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'));
          currentContent.unshift(submission);
          const updatedBase64 = Buffer.from(JSON.stringify(currentContent, null, 2) + '\n').toString('base64');

          await fetch(`https://api.github.com/repos/${githubRepo}/contents/data/submissions.json`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `intake: log candidate submission ${submission.name} (${submission.id})`,
              content: updatedBase64,
              sha: fileData.sha,
              branch: 'main',
            }),
          });
        }
      } catch (ghErr) {
        console.warn('[Submissions] GitHub API logging notice:', ghErr.message);
      }
    }

    // 3. Await SMTP notification
    const emailResult = await sendCandidateNotificationEmail(submission);

    return NextResponse.json({
      success: true,
      submissionId,
      message: 'Project candidate successfully submitted for Pinaka Foundry evaluation.',
      submission,
      emailNotified: emailResult?.success ?? false,
      emailDebug: emailResult?.success ? undefined : (emailResult?.error || emailResult?.reason || 'SMTP transmission pending'),
    });
  } catch (err) {
    console.error('[API /submissions] Error:', err);
    return NextResponse.json(
      { error: 'Failed to process project candidate submission.' },
      { status: 500 }
    );
  }
}
