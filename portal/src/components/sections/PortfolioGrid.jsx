'use client';

import { useProjects } from '@/hooks/useProjects';
import ProjectLedgerRow from './ProjectLedgerRow';
import Spinner from '@/components/ui/Spinner';
import clsx from 'clsx';
import { TRACK_LABELS } from '@/lib/constants';

const FILTER_OPTIONS = [
  { value: '', label: 'Complete Ledger' },
  { value: 'flagship', label: 'Primary Flagships' },
  { value: 'research', label: 'DeepTech Research' },
  { value: 'incubating', label: 'Incubating (SIH)' },
  { value: 'community', label: 'Community Collective' },
];

export default function PortfolioGrid() {
  const { projects, isLoading, error, filter, setFilter } = useProjects();

  function handleFilterChange(track) {
    setFilter((prev) => ({ ...prev, track: track || undefined }));
  }

  return (
    <section
      id="portfolio"
      className="w-full bg-pinaka-kailash py-16 sm:py-24"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-pinaka-hairline pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-pinaka-saffron font-semibold">
                Registry Index &middot; Phase 2026
              </span>
            </div>
            <h2
              id="portfolio-heading"
              className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-pinaka-charcoal"
            >
              The Studio Ledger of Works
            </h2>
            <p className="mt-2 text-sm text-pinaka-slate max-w-2xl font-sans">
              Production systems, verified research models, and incubated student technologies 
              curated under the Pinaka engineering baseline.
            </p>
          </div>

          {/* Filter Bar (Tabbed Architectural Style) */}
          <div
            className="flex flex-wrap items-center gap-2 border border-pinaka-hairline bg-pinaka-chalk p-1.5 shadow-sm rounded-sm"
            role="group"
            aria-label="Filter ledger by track"
          >
            {FILTER_OPTIONS.map(({ value, label }) => {
              const isActive = (filter.track ?? '') === value;
              return (
                <button
                  key={value}
                  onClick={() => handleFilterChange(value)}
                  aria-pressed={isActive}
                  className={clsx(
                    'px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer rounded-sm font-sans',
                    isActive
                      ? 'bg-pinaka-saffron text-white shadow-saffron-sm'
                      : 'text-pinaka-slate hover:text-pinaka-stone hover:bg-pinaka-ice'
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Ledger Container */}
        <div className="border border-pinaka-hairline bg-pinaka-chalk shadow-editorial">
          {/* Ledger Table Sub-Header */}
          <div className="hidden lg:grid grid-cols-12 gap-8 px-8 py-3.5 border-b border-pinaka-hairline bg-pinaka-ice text-[11px] font-mono uppercase tracking-widest text-pinaka-ash">
            <div className="col-span-4">Venture Nomenclature & Index</div>
            <div className="col-span-5 border-l border-pinaka-hairline pl-8">Core Architecture & Highlights</div>
            <div className="col-span-3 border-l border-pinaka-hairline pl-8">Operational State & Launch</div>
          </div>

          {/* Content Rows */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Spinner size="lg" />
              <span className="font-mono text-xs text-pinaka-ash uppercase tracking-wider">
                Accessing Studio Ledger...
              </span>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="font-serif text-lg text-pinaka-rudra">
                Failed to access ledger registry.
              </p>
              <p className="text-xs text-pinaka-slate mt-1 font-mono">
                Verify internal data/projects.json integrity.
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-16 text-center">
              <p className="font-serif text-lg text-pinaka-stone">
                No active ventures found in this classification.
              </p>
              <p className="text-xs text-pinaka-slate mt-1">
                Candidate prototypes in this track are currently pending Gate 2 Opportunity Evaluation.
              </p>
            </div>
          ) : (
            projects.map((project, idx) => (
              <ProjectLedgerRow
                key={project.id || project.name}
                project={project}
                index={idx}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}
