import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { Terminal, ArrowUpRight, UserCheck } from 'lucide-react';

/**
 * Editorial Project Profile Row component conforming to Section 4.1 & 4.2:
 * "Creator / team agreed credit, problem, proposed solution, evidence, and clear status labels."
 */
export default function ProjectLedgerRow({ project, index }) {
  const {
    name,
    tagline,
    track,
    status,
    category,
    techStack,
    highlights,
    demoUrl,
    repoUrl,
    leadBuilder,
    description,
  } = project;

  const displayIndex = index < 9 ? `0${index + 1}` : `${index + 1}`;

  return (
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
                <span className="text-[10px] sm:text-[11px] font-mono text-pinaka-ash uppercase tracking-wider">
                  {category}
                </span>
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

            {/* Creator Credit & Ownership Notice (§4.1 & §6.3) */}
            <div className="pt-3 border-t border-pinaka-hairline flex items-center justify-between">
              <span className="text-[10px] sm:text-[11px] font-mono text-pinaka-ash flex items-center gap-1.5">
                <UserCheck className="h-3 w-3 text-pinaka-saffron" />
                Creator / Team: <strong className="text-pinaka-stone font-semibold">{leadBuilder || 'Independent Builder'}</strong>
              </span>
              <Badge variant="status" value={status} />
            </div>
          </div>

          {/* Column 2: Problem Solved & Evidence (§4.1) */}
          <div className="lg:col-span-5 border-t lg:border-t-0 pt-5 lg:pt-0 lg:border-l lg:border-pinaka-hairline lg:pl-8">
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-pinaka-ash mb-2 sm:mb-2.5 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
              Proposed Solution & Evidence of Progress
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
                Technical Stack & Architecture
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

          {/* Column 3: Current State & Collaboration Routes (§4.1 & §7.2) */}
          <div className="lg:col-span-3 border-t lg:border-t-0 pt-5 lg:pt-0 lg:border-l lg:border-pinaka-hairline lg:pl-8 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-pinaka-ash mb-2">
                Scope & Context
              </div>
              <p className="text-xs text-pinaka-slate leading-relaxed mb-4">
                {description}
              </p>
            </div>

            {/* Action Links */}
            <div className="space-y-2.5 pt-3 sm:pt-4 border-t border-pinaka-hairline">
              {demoUrl ? (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <Button variant="primary" size="sm" className="w-full">
                    Launch Interactive Demo
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 border border-pinaka-hairline bg-pinaka-ice py-2 px-3 text-xs font-mono text-pinaka-slate rounded-sm text-center">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  Prototype / Testing In Progress
                </div>
              )}

              {repoUrl ? (
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    Inspect Public Codebase
                  </Button>
                </a>
              ) : (
                <div className="text-center py-1">
                  <span className="text-[10px] sm:text-[11px] font-mono text-pinaka-ash">
                    Private / Research In Progress
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </article>
  );
}
