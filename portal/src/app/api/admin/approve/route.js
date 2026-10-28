import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import crypto from 'crypto';
import { checkAdminAuth, verifyCsrfOrigin } from '@/lib/adminAuth';

export const dynamic = 'force-dynamic';

/**
 * Generates a clean, URL-safe, non-empty slug from a name or proposed ID.
 * @param {string} proposedId 
 * @param {string} name 
 * @returns {string}
 */
function generateProjectSlug(proposedId, name) {
  const source = (proposedId || name || '').trim().toLowerCase();
  let slug = source
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  if (!slug || slug.length < 3) {
    const randomSuffix = crypto.randomBytes(3).toString('hex');
    slug = slug ? `${slug}-${randomSuffix}` : `pinaka-project-${randomSuffix}`;
  }

  return slug;
}

/**
 * Ensures slug is unique among existing projects by appending a short suffix if collided.
 * @param {string} baseSlug 
 * @param {Array<{ id: string }>} existingProjects 
 * @param {string|null} currentId 
 * @returns {string}
 */
function resolveUniqueSlug(baseSlug, existingProjects, currentId) {
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (
    existingProjects.some(
      (p) => p.id === uniqueSlug && p.id !== currentId
    )
  ) {
    const suffix = crypto.randomBytes(2).toString('hex');
    uniqueSlug = `${baseSlug}-${suffix}`;
    counter++;
    if (counter > 10) break;
  }

  return uniqueSlug;
}

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
      allowOverwrite = false,
    } = body;

    if (!name || !tagline) {
      return NextResponse.json({ error: 'Name and tagline are required.' }, { status: 400 });
    }

    const baseSlug = generateProjectSlug(id, name);

    const projectPayload = {
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
    let persisted = false;
    let finalProject = null;

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

      const existingIdx = id ? currentContent.findIndex((p) => p.id === id) : -1;
      if (existingIdx >= 0 && !allowOverwrite) {
        return NextResponse.json(
          {
            error: `Project with ID '${id}' already exists in ledger. Set allowOverwrite to true to overwrite.`,
            existingProjectId: id,
          },
          { status: 409 }
        );
      }

      const projectId = (existingIdx >= 0 && allowOverwrite)
        ? id
        : resolveUniqueSlug(baseSlug, currentContent, id);
      finalProject = { id: projectId, ...projectPayload };

      const targetIdx = currentContent.findIndex((p) => p.id === projectId);
      if (targetIdx >= 0) {
        currentContent[targetIdx] = finalProject;
      } else {
        currentContent.push(finalProject);
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
          message: `add: ${finalProject.name} to studio portfolio ledger`,
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
      persisted = true;
      console.log('[Approve] GitHub commit successful:', commitResult.commit?.sha);
    } else {
      // Local fallback: update file locally
      console.log('[Approve] No GITHUB_TOKEN set; writing to local data/projects.json...');
      const localPath = join(process.cwd(), '..', 'data', 'projects.json');
      try {
        let projects = [];
        if (existsSync(localPath)) {
          const raw = readFileSync(localPath, 'utf-8');
          projects = JSON.parse(raw);
        }

        const existingIdx = id ? projects.findIndex((p) => p.id === id) : -1;
        if (existingIdx >= 0 && !allowOverwrite) {
          return NextResponse.json(
            {
              error: `Project with ID '${id}' already exists in ledger. Set allowOverwrite to true to overwrite.`,
              existingProjectId: id,
            },
            { status: 409 }
          );
        }

        const projectId = (existingIdx >= 0 && allowOverwrite)
          ? id
          : resolveUniqueSlug(baseSlug, projects, id);
        finalProject = { id: projectId, ...projectPayload };

        const targetIdx = projects.findIndex((p) => p.id === projectId);
        if (targetIdx >= 0) {
          projects[targetIdx] = finalProject;
        } else {
          projects.push(finalProject);
        }
        writeFileSync(localPath, JSON.stringify(projects, null, 2) + '\n', 'utf-8');
        persisted = true;
      } catch (fsErr) {
        throw new Error(`Failed to persist project to local storage: ${fsErr.message}`);
      }
    }

    if (!persisted || !finalProject) {
      throw new Error('Project approval failed: storage medium unavailable.');
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
      message: `Project "${finalProject.name}" successfully approved and ingested into Pinaka ledger!`,
      project: finalProject,
      githubCommitSha: commitResult?.commit?.sha || null,
    });
  } catch (err) {
    console.error('[API /admin/approve] Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to approve project' }, { status: 500 });
  }
}
