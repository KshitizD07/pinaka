import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { checkAdminAuth, verifyCsrfOrigin } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  if (!verifyCsrfOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden: Invalid request origin.' }, { status: 403 });
  }

  const session = checkAdminAuth();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized. Studio Lead session required.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      submissionId,
      id,
      name,
      tagline,
      category,
      track,
      status,
      techStack,
      leadBuilder,
      squadUrl,
      skillSphereUrl,
      skillSphereLabel,
      repoUrl,
      demoUrl,
      description,
      highlights,
    } = body;

    if (!name || !tagline) {
      return NextResponse.json({ error: 'Name and tagline are required.' }, { status: 400 });
    }

    const projectId = id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newProject = {
      id: projectId,
      name: name.trim(),
      tagline: tagline.trim(),
      category: category || 'Campus Tech',
      track: track || 'incubating',
      status: status || 'prototype',
      techStack: Array.isArray(techStack)
        ? techStack
        : typeof techStack === 'string'
        ? techStack.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      leadBuilder: (leadBuilder || 'KSHITIZ').toUpperCase(),
      squadUrl: squadUrl?.trim() || null,
      skillSphereUrl: skillSphereUrl?.trim() || null,
      skillSphereLabel: skillSphereLabel?.trim() || null,
      repoUrl: repoUrl?.trim() || null,
      demoUrl: demoUrl?.trim() || null,
      description: description?.trim() || '',
      highlights: Array.isArray(highlights) && highlights.length > 0
        ? highlights
        : [
            `${category} system engineered under Pinaka baseline standards.`,
            `Built with modern ${Array.isArray(techStack) ? techStack.slice(0, 3).join(', ') : 'modular'} architecture.`,
          ],
    };

    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPOSITORY || 'KshitizD07/pinaka';

    let commitResult = null;

    // Option A: If GITHUB_TOKEN is available, commit via GitHub API
    if (githubToken) {
      console.log(`[Approve] Committing to GitHub repository ${githubRepo} via GitHub API...`);
      const getRes = await fetch(`https://api.github.com/repos/${githubRepo}/contents/data/projects.json`, {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!getRes.ok) {
        throw new Error(`GitHub API error fetching projects.json: ${getRes.statusText}`);
      }

      const fileData = await getRes.json();
      const currentContent = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'));

      // Check if project already exists, replace or append
      const existingIdx = currentContent.findIndex((p) => p.id === projectId);
      if (existingIdx >= 0) {
        currentContent[existingIdx] = newProject;
      } else {
        currentContent.push(newProject);
      }

      const updatedBase64 = Buffer.from(JSON.stringify(currentContent, null, 2) + '\n').toString('base64');

      const putRes = await fetch(`https://api.github.com/repos/${githubRepo}/contents/data/projects.json`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `add: ${newProject.name} to studio portfolio ledger`,
          content: updatedBase64,
          sha: fileData.sha,
          branch: 'main',
        }),
      });

      if (!putRes.ok) {
        const errBody = await putRes.text();
        throw new Error(`GitHub API commit failed: ${errBody}`);
      }

      commitResult = await putRes.json();
      console.log('[Approve] GitHub commit successful:', commitResult.commit?.sha);
    } else {
      // Local fallback: update file locally
      console.log('[Approve] No GITHUB_TOKEN set; writing to local data/projects.json...');
      const localPath = join(process.cwd(), '..', 'data', 'projects.json');
      if (existsSync(localPath)) {
        const raw = readFileSync(localPath, 'utf-8');
        const projects = JSON.parse(raw);
        const existingIdx = projects.findIndex((p) => p.id === projectId);
        if (existingIdx >= 0) {
          projects[existingIdx] = newProject;
        } else {
          projects.push(newProject);
        }
        writeFileSync(localPath, JSON.stringify(projects, null, 2) + '\n', 'utf-8');
      }
    }

    // Mark submission as APPROVED in submissions store
    try {
      const submissionsPath = join(process.cwd(), '..', 'data', 'submissions.json');
      if (existsSync(submissionsPath)) {
        const raw = readFileSync(submissionsPath, 'utf-8');
        const subs = JSON.parse(raw);
        const target = subs.find((s) => s.id === submissionId);
        if (target) {
          target.status = 'APPROVED';
          target.approvedAt = new Date().toISOString();
          writeFileSync(submissionsPath, JSON.stringify(subs, null, 2), 'utf-8');
        }
      }
    } catch {}

    return NextResponse.json({
      success: true,
      message: `Project "${newProject.name}" successfully approved and ingested into Pinaka ledger!`,
      project: newProject,
      githubCommitSha: commitResult?.commit?.sha || null,
    });
  } catch (err) {
    console.error('[API /admin/approve] Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to approve project' }, { status: 500 });
  }
}
