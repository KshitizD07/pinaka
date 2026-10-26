import Link from 'next/link';
import Button from '@/components/ui/Button';
import PinakaBow from '@/components/ui/PinakaBow';
import { getAllProjects } from '@/lib/projects';
import { ArrowUpRight, Compass } from 'lucide-react';

export default function Hero() {
  const projects = getAllProjects();
  const projectCount = projects.length;

  return (
    <section
      className="relative w-full border-b border-pinaka-hairline bg-transparent overflow-hidden"
      aria-label="Pinaka Ecosystem Overview"
    >
      {/* Structural subtle grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(to right, #1E293B 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left Column: Thesis & Ecosystem Mission (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Eyebrow */}
              <div className="mb-4 sm:mb-6 inline-flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="h-2 w-2 rounded-full bg-pinaka-saffron animate-pulse shrink-0" />
                <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-pinaka-saffron">
                  Curated Project Ecosystem
                </span>
                <span className="text-pinaka-hairline font-mono hidden sm:inline">|</span>
                <span className="font-serif text-[11px] sm:text-xs tracking-wider text-pinaka-ash">
                  Discover &middot; Connect &middot; Build
                </span>
              </div>

              {/* Title / Proclamation */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pinaka-charcoal leading-[1.15] mb-5 sm:mb-6">
                A home for ambitious ideas,{' '}
                <span className="text-pinaka-saffron underline decoration-pinaka-saffron/30 underline-offset-4 sm:underline-offset-8">
                  promising projects
                </span>, and emerging ventures.
              </h1>

              {/* Thesis Statement */}
              <p className="text-sm sm:text-base lg:text-lg text-pinaka-slate leading-relaxed mb-6 sm:mb-8 max-w-2xl font-sans">
                <strong className="font-semibold text-pinaka-stone">Pinaka</strong> is an emerging, 
                manually curated ecosystem for thoughtful concepts, prototypes, research, and early ventures. 
                We help creators showcase their work, build visibility, and connect with execution support and 
                collaborators through <strong className="font-semibold text-pinaka-stone">SkillSphere</strong>.
              </p>

              {/* Core Ecosystem Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-10 border-y border-pinaka-hairline py-4 sm:py-5">
                <div>
                  <div className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-saffron mb-1">
                    01. Thoughtful Curation
                  </div>
                  <p className="text-xs text-pinaka-slate leading-relaxed">
                    Publication is earned through manual review. We prioritize problem significance and creator readiness.
                  </p>
                </div>
                <div>
                  <div className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-saffron mb-1">
                    02. 100% Creator IP
                  </div>
                  <p className="text-xs text-pinaka-slate leading-relaxed">
                    Showcasing work never transfers ownership. Creators retain their rights, source code, and full credit.
                  </p>
                </div>
                <div>
                  <div className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-saffron mb-1">
                    03. Clear Pathways
                  </div>
                  <p className="text-xs text-pinaka-slate leading-relaxed">
                    Clear separation between concepts, prototypes, and launched products—with collaborative execution via SkillSphere.
                  </p>
                </div>
              </div>

              {/* Action Launchers */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a href="#portfolio" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto">
                    Explore Featured Portfolio
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </a>
                <Link href="/onboard" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Apply to Showcase Project
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Ecosystem Charter */}
          <div className="lg:col-span-5 bg-white/95 backdrop-blur-sm border border-pinaka-hairline p-5 sm:p-8 shadow-editorial rounded-sm">
            {/* Charter Header */}
            <div className="flex items-center justify-between border-b border-pinaka-hairline pb-4 mb-5 sm:mb-6">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <PinakaBow className="h-4.5 sm:h-5 w-auto text-pinaka-saffron shrink-0" />
                <span className="font-serif text-xs sm:text-sm font-bold tracking-wider uppercase text-pinaka-stone">
                  Ecosystem Charter
                </span>
              </div>
              <span className="font-mono text-[10px] sm:text-xs bg-pinaka-saffron-wash text-pinaka-saffron-deep px-2 sm:px-2.5 py-0.5 rounded-sm border border-pinaka-saffron/20 font-semibold">
                CURATED HUB
              </span>
            </div>

            {/* Dynamic Charter Specifications */}
            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-pinaka-hairline/60 pb-3 gap-1">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-pinaka-ash">
                  Classification
                </span>
                <span className="text-xs font-semibold text-pinaka-stone sm:text-right">
                  Curated Project Ecosystem & Showcase
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-pinaka-hairline/60 pb-3 gap-1">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-pinaka-ash">
                  Curated Projects
                </span>
                <span className="text-xs font-semibold text-pinaka-stone sm:text-right font-mono text-pinaka-saffron">
                  {projectCount < 10 ? `0${projectCount}` : projectCount} Approved Works
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-pinaka-hairline/60 pb-3 gap-1">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-pinaka-ash">
                  Collaboration Hub
                </span>
                <span className="text-xs font-semibold text-pinaka-stone sm:text-right">
                  SkillSphere Squads & Talent Formation
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-pinaka-hairline/60 pb-3 gap-1">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-pinaka-ash">
                  Operating Principle
                </span>
                <span className="text-xs font-semibold text-pinaka-stone sm:text-right font-mono">
                  Curated Review &middot; Zero IP Seizure
                </span>
              </div>
            </div>

            {/* What Pinaka Is Not Box */}
            <div className="bg-pinaka-ice border border-pinaka-hairline/80 p-3.5 sm:p-4 rounded-sm">
              <div className="text-[11px] font-mono uppercase tracking-wider text-pinaka-slate font-semibold mb-2 flex items-center gap-2">
                <Compass className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                What Pinaka Is Not
              </div>
              <ul className="space-y-1.5 text-xs text-pinaka-slate font-sans">
                <li className="flex items-start gap-1.5">
                  <span className="text-pinaka-ash">&bull;</span>
                  <span>Not a general-purpose freelance or software development agency.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-pinaka-ash">&bull;</span>
                  <span>Not an automatic owner of every project featured on this page.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-pinaka-ash">&bull;</span>
                  <span>Not a substitute for a creator’s own technical or commercial validation.</span>
                </li>
              </ul>
            </div>

            {/* Campaign Line */}
            <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-pinaka-hairline text-center">
              <p className="text-xs italic text-pinaka-stone font-serif font-medium">
                &ldquo;Discover ideas. Connect talent. Build what matters.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
