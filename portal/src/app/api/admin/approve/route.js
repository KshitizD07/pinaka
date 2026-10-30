import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import crypto from 'crypto';
import { checkAdminAuth, verifyCsrfOrigin } from '@/lib/adminAuth';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const ALLOWED_TRACKS = new Set(['flagship', 'incubating', 'breakthroughs', 'proposals', 'community']);
const ALLOWED_STATUSES = new Set(['live', 'prototype', 'concept', 'mvp', 'pilot', 'paused', 'archived']);

function sanitizeCategory(input) {
  if (!input || typeof input !== 'string') return 'Campus Tech';
  const trimmed = input.trim();
  return trimmed.slice(0, 50) || 'Campus Tech';
}

function getProjectsPath() {
  const rootData = join(process.cwd(), 'data', 'projects.json');
  const parentData = join(process.cwd(), '..', 'data', 'projects.json');
  return existsSync(rootData) ? rootData : parentData;
}

function getSubmissionsPath() {
  const rootData = join(process.cwd(), 'data', 'submissions.json');
  const parentData = join(process.cwd(), '..', 'data', 'submissions.json');
  return existsSync(rootData) ? rootData : parentData;
}

function isValidHttpUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return false;
  try {
    const parsed = new URL(urlString.trim());
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

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
      contact,
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

    const assignedTrack = track || 'incubating';
    if (!ALLOWED_TRACKS.has(assignedTrack)) {
      return NextResponse.json(
        { error: `Invalid track '${assignedTrack}'. Allowed tracks: ${[...ALLOWED_TRACKS].join(', ')}` },
        { status: 400 }
      );
    }

    const assignedStatus = status || 'prototype';
    if (!ALLOWED_STATUSES.has(assignedStatus)) {
      return NextResponse.json(
        { error: `Invalid status '${assignedStatus}'. Allowed statuses: ${[...ALLOWED_STATUSES].join(', ')}` },
        { status: 400 }
      );
    }

    const assignedCategory = sanitizeCategory(category);

    const urlFields = [
      { key: 'repoUrl', val: repoUrl },
      { key: 'demoUrl', val: demoUrl },
      { key: 'squadUrl', val: squadUrl },
      { key: 'skillSphereUrl', val: skillSphereUrl },
    ];

    for (const { key, val } of urlFields) {
      if (val && !isValidHttpUrl(val)) {
        return NextResponse.json(
          { error: `Invalid URL format for ${key}. Must use http or https scheme.` },
          { status: 400 }
        );
      }
    }

    const baseSlug = generateProjectSlug(id, name);

    const projectPayload = {
      name: name.trim(),
      tagline: tagline.trim(),
      category: assignedCategory,
      track: assignedTrack,
      status: assignedStatus,
      techStack: Array.isArray(techStack)
        ? techStack
        : typeof techStack === 'string'
        ? techStack.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      leadBuilder: (leadBuilder || 'KSHITIZ').toUpperCase(),
      contact: contact?.trim() || null,
      squadUrl: squadUrl?.trim() || null,
      skillSphereUrl: skillSphereUrl?.trim() || null,
      skillSphereLabel: skillSphereLabel?.trim() || null,
      repoUrl: repoUrl?.trim() || null,
      demoUrl: demoUrl?.trim() || null,
      description: description?.trim() || '',
      highlights: Array.isArray(highlights) && highlights.length > 0
        ? highlights
        : [
            `${assignedCategory} system engineered under Pinaka baseline standards.`,
            `Built with modern ${Array.isArray(techStack) ? techStack.slice(0, 3).join(', ') : 'modular'} architecture.`,
          ],
    };

    let persisted = false;
    let finalProject = null;

    // Load existing projects from local file (or Supabase) to resolve unique slugs
    const localProjectsPath = getProjectsPath();
    let currentProjects = [];
    if (existsSync(localProjectsPath)) {
      try {
        currentProjects = JSON.parse(readFileSync(localProjectsPath, 'utf-8'));
      } catch {}
    }

    const existingIdx = id ? currentProjects.findIndex((p) => p.id === id) : -1;
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
      : resolveUniqueSlug(baseSlug, currentProjects, id);

    finalProject = { id: projectId, ...projectPayload };

    // 1. Persist to Supabase if available
    if (isSupabaseConfigured() && supabase) {
      try {
        const { error: sbErr } = await supabase.from('projects').upsert({
          id: finalProject.id,
          name: finalProject.name,
          tagline: finalProject.tagline,
          description: finalProject.description,
          category: finalProject.category,
          track: finalProject.track,
          status: finalProject.status,
          lead: finalProject.leadBuilder,
          contact: finalProject.contact,
          repo_url: finalProject.repoUrl,
          demo_url: finalProject.demoUrl,
          highlights: Array.isArray(finalProject.highlights) ? finalProject.highlights.join('\n') : finalProject.highlights,
          tech_stack: finalProject.techStack,
          squad_url: finalProject.squadUrl,
          skill_sphere_url: finalProject.skillSphereUrl,
          updated_at: new Date().toISOString(),
        });

        if (!sbErr) {
          persisted = true;
          console.log(`[Approve] Persisted project ${finalProject.id} to Supabase.`);
        } else {
          console.warn('[Approve] Supabase project upsert error:', sbErr.message);
        }

        // Update submission status in Supabase
        if (submissionId) {
          await supabase
            .from('submissions')
            .update({ status: 'APPROVED' })
            .eq('id', submissionId);
        }
      } catch (err) {
        console.warn('[Approve] Supabase exception:', err.message);
      }
    }

    // 2. Persist to GitHub repository if GITHUB_TOKEN is available
    const githubToken = process.env.GITHUB_TOKEN;
    const githubRepo = process.env.GITHUB_REPOSITORY || 'KshitizD07/pinaka';
    let githubCommitSha = null;

    if (githubToken) {
      try {
        console.log(`[Approve] Syncing approved project to GitHub repo ${githubRepo} via GitHub API...`);
        const getRes = await fetch(`https://api.github.com/repos/${githubRepo}/contents/data/projects.json`, {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: 'application/vnd.github.v3+json',
            'User-Agent': 'Pinaka-Foundry-Approve',
          },
        });

        if (getRes.ok) {
          const fileData = await getRes.json();
          const remoteProjects = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'));
          const existingIdx = remoteProjects.findIndex((p) => p.id === projectId);
          if (existingIdx >= 0) {
            remoteProjects[existingIdx] = finalProject;
          } else {
            remoteProjects.push(finalProject);
          }

          const updatedBase64 = Buffer.from(JSON.stringify(remoteProjects, null, 2) + '\n').toString('base64');
          const putRes = await fetch(`https://api.github.com/repos/${githubRepo}/contents/data/projects.json`, {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
              'User-Agent': 'Pinaka-Foundry-Approve',
            },
            body: JSON.stringify({
              message: `add: ${finalProject.name} to studio portfolio ledger [skip ci]`,
              content: updatedBase64,
              sha: fileData.sha,
              branch: 'main',
            }),
          });

          if (putRes.ok) {
            const commitData = await putRes.json();
            githubCommitSha = commitData.commit?.sha || null;
            console.log('[Approve] GitHub commit successful:', githubCommitSha);
          } else {
            const errText = await putRes.text();
            console.warn('[Approve] GitHub API commit failed:', errText);
          }
        } else {
          console.warn('[Approve] Could not fetch projects.json from GitHub:', getRes.statusText);
        }
      } catch (ghErr) {
        console.warn('[Approve] GitHub sync exception:', ghErr.message);
      }
    }

    // 3. Persist to local projects.json (for local dev environments)
    try {
      const targetIdx = currentProjects.findIndex((p) => p.id === projectId);
      if (targetIdx >= 0) {
        currentProjects[targetIdx] = finalProject;
      } else {
        currentProjects.push(finalProject);
      }
      writeFileSync(localProjectsPath, JSON.stringify(currentProjects, null, 2) + '\n', 'utf-8');
      persisted = true;
    } catch (fsErr) {
      console.warn('[Approve] Could not write to local projects.json:', fsErr.message);
    }

    // 3. Update local submissions.json if present
    if (submissionId) {
      try {
        const submissionsPath = getSubmissionsPath();
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
    }

    if (!persisted || !finalProject) {
      throw new Error('Project approval failed: storage medium unavailable.');
    }

    return NextResponse.json({
      success: true,
      message: `Project "${finalProject.name}" successfully approved and ingested into Pinaka ledger!`,
      project: finalProject,
      githubCommitSha,
    });
  } catch (err) {
    console.error('[API /admin/approve] Error:', err);
    return NextResponse.json({ error: err.message || 'Failed to approve project' }, { status: 500 });
  }
}
