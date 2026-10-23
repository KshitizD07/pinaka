import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { ExternalLink, Terminal, Shield, ArrowUpRight, Check } from 'lucide-react';
import clsx from 'clsx';

/**
 * Editorial Project Ledger Row component.
 * Replaces the cookie-cutter AI card grid with an expansive, architectural dossier.
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

  // Format index into Roman and Devanagari numerals
  const numerals = [
    { roman: 'I', devanagari: '०१' },
    { roman: 'II', devanagari: '०२' },
    { roman: 'III', devanagari: '०३' },
    { roman: 'IV', devanagari: '०४' },
    { roman: 'V', devanagari: '०५' },
  ];
  const currentNumeral = numerals[index] || { roman: `0${index + 1}`, devanagari: `०${index + 1}` };

  return (
    <article
      className="group relative border-b border-pinaka-hairline bg-pinaka-chalk hover:bg-pinaka-kailash/60 transition-colors duration-200"
      aria-label={`${name} project dossier`}
    >
      {/* Saffron left border indicator on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-pinaka-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

      <div className="px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Nomenclature & Classification (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              {/* Indices & Track Badge */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold text-pinaka-saffron tracking-wider">
                  [{currentNumeral.devanagari} / {currentNumeral.roman}]
                </span>
                <Badge variant="track" value={track} />
                <span className="text-[11px] font-mono text-pinaka-ash uppercase tracking-wider">
                  {category}
                </span>
              </div>

              {/* Project Name */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-pinaka-charcoal group-hover:text-pinaka-saffron-deep transition-colors mb-2">
                {name}
              </h3>

              {/* Tagline */}
              <p className="text-sm text-pinaka-slate leading-relaxed font-sans mb-4">
                {tagline}
              </p>
            </div>

            {/* Attribution & Status */}
            <div className="pt-3 border-t border-pinaka-hairline flex items-center justify-between">
              <span className="text-[11px] font-mono text-pinaka-ash">
                Architect: <strong className="text-pinaka-stone font-semibold">{leadBuilder}</strong>
              </span>
              <Badge variant="status" value={status} />
            </div>
          </div>

          {/* Column 2: Architecture Thesis & Technical Proof (5 cols) */}
          <div className="lg:col-span-5 lg:border-l lg:border-pinaka-hairline lg:pl-8">
            <div className="text-[11px] font-mono uppercase tracking-widest text-pinaka-ash mb-2.5 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-pinaka-saffron" />
              Core Architecture & Highlights
            </div>

            {/* Highlights List */}
            <ul className="space-y-2 mb-5">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-xs text-pinaka-stone leading-relaxed"
                >
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-pinaka-saffron shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {/* Technical Stack Tags */}
            <div className="pt-3 border-t border-pinaka-hairline/60">
              <div className="text-[10px] font-mono uppercase tracking-widest text-pinaka-ash mb-2">
                Verified Stack Specifications
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] bg-pinaka-ice border border-pinaka-hairline px-2 py-0.5 text-pinaka-slate rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Operational State & Launchpad (3 cols) */}
          <div className="lg:col-span-3 lg:border-l lg:border-pinaka-hairline lg:pl-8 flex flex-col justify-between h-full space-y-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-pinaka-ash mb-2">
                Operational Status
              </div>
              <p className="text-xs text-pinaka-slate leading-relaxed mb-4">
                {description}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 pt-4 border-t border-pinaka-hairline">
              {demoUrl ? (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block"
                >
                  <Button variant="primary" size="sm" className="w-full">
                    Launch Live Deployment
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 border border-pinaka-hairline bg-pinaka-ice py-2 px-3 text-xs font-mono text-pinaka-slate rounded-sm">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  Pilot / Sandbox Active
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
                    Inspect Repository
                  </Button>
                </a>
              ) : (
                <div className="text-center">
                  <span className="text-[11px] font-mono text-pinaka-ash">
                    Private Studio Monorepo
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
