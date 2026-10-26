'use client';

import { useState, useMemo } from 'react';
import { useProjects } from '@/hooks/useProjects';
import ProjectLedgerRow from './ProjectLedgerRow';
import Spinner from '@/components/ui/Spinner';
import { TRACK_DESCRIPTIONS } from '@/lib/constants';
import { Search, X } from 'lucide-react';
import clsx from 'clsx';

// Categories requested: Featured, Ongoing Work, Breakthroughs, Proposals
const TRACK_OPTIONS = [
  { value: '', label: 'All Works' },
  { value: 'flagship', label: 'Featured' },
  { value: 'incubating', label: 'Ongoing Work' },
  { value: 'breakthroughs', label: 'Breakthroughs' },
  { value: 'proposals', label: 'Proposals' },
];

const INITIAL_PAGE_SIZE = 6;

export default function PortfolioGrid() {
  const { projects, total, isLoading, error, filter, setFilter } = useProjects();
  const [searchInput, setSearchInput] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);

  function handleTrackChange(track) {
    setVisibleCount(INITIAL_PAGE_SIZE);
    setFilter((prev) => ({ ...prev, track: track || undefined }));
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    setVisibleCount(INITIAL_PAGE_SIZE);
    setFilter((prev) => ({ ...prev, search: searchInput.trim() || undefined }));
  }

  function handleClearSearch() {
    setSearchInput('');
    setVisibleCount(INITIAL_PAGE_SIZE);
    setFilter((prev) => ({ ...prev, search: undefined }));
  }

  function handleResetAll() {
    setSearchInput('');
    setVisibleCount(INITIAL_PAGE_SIZE);
    setFilter({});
  }

  const displayedProjects = useMemo(() => {
    return projects.slice(0, visibleCount);
  }, [projects, visibleCount]);

  const hasActiveFilters = Boolean(filter.track || filter.search);
  const currentTrackKey = filter.track || '';
  const currentOneLiner = TRACK_DESCRIPTIONS[currentTrackKey] || TRACK_DESCRIPTIONS[''];

  return (
    <section
      id="portfolio"
      className="w-full bg-transparent py-12 sm:py-20 lg:py-24"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 border-b border-pinaka-hairline pb-5 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-pinaka-saffron font-semibold">
                  Curated Portfolio &middot; Active Cohort
                </span>
              </div>
              <h2
                id="portfolio-heading"
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-pinaka-charcoal"
              >
                Curated Works & Projects
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-pinaka-slate max-w-2xl font-sans">
                A manually curated directory of ambitious ideas, prototypes, research, and emerging ventures.
                Creators retain 100% intellectual property and recognition.
              </p>
            </div>

            {/* Quick Registry Metric */}
            <div className="inline-flex self-start sm:self-auto items-center gap-2.5 font-mono text-xs text-pinaka-slate bg-white/90 border border-pinaka-hairline px-3.5 py-2 rounded-sm shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span>
                Curated Index: <strong className="text-pinaka-stone">{total}</strong> Selected Works
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mb-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          
          {/* Category Tabs: Featured, Ongoing Work, Breakthroughs, Proposals */}
          <div className="overflow-x-auto pb-1 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
            <div
              className="inline-flex items-center gap-1.5 border border-pinaka-hairline bg-white/90 p-1.5 shadow-sm rounded-sm whitespace-nowrap min-w-full sm:min-w-0"
              role="group"
              aria-label="Filter portfolio by category"
            >
              {TRACK_OPTIONS.map(({ value, label }) => {
                const isActive = (filter.track ?? '') === value;
                return (
                  <button
                    key={value}
                    onClick={() => handleTrackChange(value)}
                    aria-pressed={isActive}
                    className={clsx(
                      'px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer rounded-sm font-sans shrink-0',
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

          {/* Search Box (Domain selector removed) */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search projects, stack, tech..."
              className="w-full bg-white/90 border border-pinaka-hairline text-pinaka-stone placeholder-pinaka-mist text-xs font-sans pl-8 pr-8 py-2 rounded-sm shadow-sm focus:outline-none focus:border-pinaka-saffron"
            />
            <Search className="h-3.5 w-3.5 text-pinaka-ash absolute left-2.5 top-1/2 -translate-y-1/2" />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-pinaka-ash hover:text-pinaka-stone p-0.5"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Dynamic Category One-Liner Description Bar */}
        <div className="mb-6 p-3 bg-white/90 border border-pinaka-hairline rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-pinaka-slate font-sans">
            <span className="font-mono text-pinaka-saffron font-bold uppercase text-[11px] shrink-0">
              Category Scope:
            </span>
            <span className="italic">{currentOneLiner}</span>
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetAll}
              className="text-pinaka-saffron hover:underline cursor-pointer text-xs font-mono shrink-0"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Dynamic Ledger Summary */}
        <div className="mb-4 text-xs font-mono text-pinaka-ash px-1">
          Showing <strong className="text-pinaka-stone">{displayedProjects.length}</strong> of{' '}
          <strong className="text-pinaka-stone">{projects.length}</strong> curated works
        </div>

        {/* The Portfolio Container */}
        <div className="border border-pinaka-hairline bg-white/90 backdrop-blur-sm shadow-editorial rounded-sm overflow-hidden">
          {/* Table Header (desktop only) */}
          <div className="hidden lg:grid grid-cols-12 gap-8 px-8 py-3.5 border-b border-pinaka-hairline bg-pinaka-ice/80 text-[11px] font-mono uppercase tracking-widest text-pinaka-ash">
            <div className="col-span-4">Project & Creator Credit</div>
            <div className="col-span-5 border-l border-pinaka-hairline pl-8">Proposed Solution & Highlights</div>
            <div className="col-span-3 border-l border-pinaka-hairline pl-8">Scope & Launch Actions</div>
          </div>

          {/* Content Rows */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 sm:py-24 gap-3">
              <Spinner size="lg" />
              <span className="font-mono text-xs text-pinaka-ash uppercase tracking-wider">
                Loading Curated Portfolio...
              </span>
            </div>
          ) : error ? (
            <div className="p-8 sm:p-12 text-center">
              <p className="font-serif text-base sm:text-lg text-pinaka-crimson">
                Failed to access portfolio records.
              </p>
              <p className="text-xs text-pinaka-slate mt-1 font-mono">
                Verify internal data/projects.json integrity.
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-8 sm:p-16 text-center">
              <p className="font-serif text-base sm:text-lg text-pinaka-stone">
                No projects found in this category.
              </p>
              <p className="text-xs text-pinaka-slate mt-2 mb-4">
                Have a project or research initiative? Apply to showcase your work under Pinaka.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleResetAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-pinaka-ice border border-pinaka-hairline text-pinaka-stone hover:bg-pinaka-saffron hover:text-white transition-colors rounded-sm"
                >
                  <X className="h-3 w-3" />
                  View All Works
                </button>
              )}
            </div>
          ) : (
            displayedProjects.map((project, idx) => (
              <ProjectLedgerRow
                key={project.id || project.name}
                project={project}
                index={idx}
              />
            ))
          )}
        </div>

        {/* Progressive Reveal Pagination Control */}
        {!isLoading && projects.length > visibleCount && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + INITIAL_PAGE_SIZE)}
              className="w-full sm:w-auto px-6 py-3 border border-pinaka-hairline bg-white/95 text-pinaka-stone hover:bg-pinaka-saffron hover:text-white hover:border-pinaka-saffron text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-sm cursor-pointer rounded-sm"
            >
              Show More Works ({projects.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
