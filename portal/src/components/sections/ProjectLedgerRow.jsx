'use client';

import { useState } from 'react';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ArrowUpRight, UserCheck, AlertCircle, X, ExternalLink } from 'lucide-react';

/**
 * Editorial Project Profile Row component.
 * Displays Creator / Team, and optionally a clean, non-glowing SkillSphere profile link.
 */
export default function ProjectLedgerRow({ project, index }) {
  const {
    name,
    tagline,
    track,
    status,
    techStack,
    highlights,
    demoUrl,
    repoUrl,
    leadBuilder,
    skillSphereUrl,
    skillSphereLabel,
    description,
  } = project;

  const [showNoDeployModal, setShowNoDeployModal] = useState(false);
  const displayIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  function handleLaunchClick(e) {
    if (!demoUrl) {
      e.preventDefault();
      setShowNoDeployModal(true);
    }
  }

  return (
    <>
      <article
        className="group relative border-b border-pinaka-hairline bg-white/95 hover:bg-white transition-colors duration-200"
        aria-label={`${name} project profile`}
      >
        {/* Saffron left indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-pinaka-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

        <div className="px-4 sm:px-8 lg:px-12 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Column 1: Project Identity & Creator Credit (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full">
              <div>
                {/* Index & Badges */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3">
                  <span className="font-mono text-xs font-bold text-pinaka-saffron tracking-wider">
                    [{displayIndex}]
                  </span>
                  <Badge variant="track" value={track} />
                  <Badge variant="status" value={status} />
                </div>

                {/* Project Name */}
                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-pinaka-charcoal group-hover:text-pinaka-saffron-deep transition-colors mb-2">
                  {name}
                </h3>

                {/* Tagline */}
                <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed font-sans mb-3 sm:mb-4">
                  {tagline}
                </p>
              </div>

              {/* Creator Credit & Clean Non-Glowing SkillSphere Link */}
              <div className="pt-3 border-t border-pinaka-hairline space-y-1.5">
                <div className="text-[10px] sm:text-[11px] font-mono text-pinaka-ash flex items-center gap-1.5">
                  <UserCheck className="h-3 w-3 text-pinaka-saffron shrink-0" />
                  <span>Creator / Team:</span>
                  <strong className="text-pinaka-stone font-semibold">
                    {leadBuilder || 'Independent Builder'}
                  </strong>
                </div>

                {/* Clean, editorial SkillSphere link (only shown if provided) */}
                {skillSphereUrl && (
                  <div className="pl-4">
                    <a
                      href={skillSphereUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-pinaka-slate hover:text-pinaka-saffron transition-colors"
                      title="View SkillSphere Profile"
                    >
                      <span className="text-pinaka-ash">SkillSphere:</span>
                      <span className="underline decoration-pinaka-hairline underline-offset-2 font-medium">
                        {skillSphereLabel || 'Profile'}
                      </span>
                      <ExternalLink className="h-2.5 w-2.5 text-pinaka-ash" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Column 2: Problem Solved & Evidence (5 cols) */}
            <div className="lg:col-span-5 border-t lg:border-t-0 pt-5 lg:pt-0 lg:border-l lg:border-pinaka-hairline lg:pl-8">
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-pinaka-ash mb-2 sm:mb-2.5">
                Proposed Solution & Highlights
              </div>

              {/* Highlights / Evidence list */}
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-xs text-pinaka-stone leading-relaxed"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-pinaka-saffron shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Technical Stack Tags */}
              <div className="pt-3 border-t border-pinaka-hairline/60">
                <div className="text-[10px] font-mono uppercase tracking-widest text-pinaka-ash mb-2">
                  Stack & Architecture
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] sm:text-[11px] bg-pinaka-ice border border-pinaka-hairline px-2 py-0.5 text-pinaka-slate rounded-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Current State & Launch Actions (3 cols) */}
            <div className="lg:col-span-3 border-t lg:border-t-0 pt-5 lg:pt-0 lg:border-l lg:border-pinaka-hairline lg:pl-8 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-pinaka-ash mb-2">
                  Scope & Context
                </div>
                <p className="text-xs text-pinaka-slate leading-relaxed mb-4">
                  {description}
                </p>
              </div>

              {/* Action Buttons: Launch System & Inspect Codebase */}
              <div className="space-y-2.5 pt-3 sm:pt-4 border-t border-pinaka-hairline">
                {demoUrl ? (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <Button variant="primary" size="sm" className="w-full">
                      Launch System
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Button>
                  </a>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full"
                    onClick={handleLaunchClick}
                  >
                    Launch System
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                )}

                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      Inspect Codebase
                    </Button>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </article>

      {/* No Active Deployment Modal Popup */}
      {showNoDeployModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pinaka-charcoal/40 backdrop-blur-sm animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-md bg-white border border-pinaka-hairline p-6 sm:p-8 shadow-editorial rounded-sm">
            <button
              onClick={() => setShowNoDeployModal(false)}
              className="absolute right-4 top-4 text-pinaka-ash hover:text-pinaka-stone p-1"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="h-9 w-9 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-pinaka-charcoal">
                  No Active Public Deployment
                </h4>
                <span className="font-mono text-[10px] text-pinaka-ash uppercase">
                  {name} &middot; Sandbox / Research Environment
                </span>
              </div>
            </div>

            <p className="text-xs text-pinaka-slate leading-relaxed mb-6 font-sans">
              <strong className="text-pinaka-stone font-semibold">{name}</strong> is currently operating within local experimental environments and simulation testbeds. A public deployment instance will be linked once staging evaluation is completed.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-pinaka-hairline">
              {repoUrl ? (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowNoDeployModal(false)}
                >
                  <Button variant="outline" size="sm">
                    Inspect Codebase
                  </Button>
                </a>
              ) : null}
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowNoDeployModal(false)}
              >
                Understood
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
