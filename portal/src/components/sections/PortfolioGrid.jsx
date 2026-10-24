'use client';

import { useState, useMemo } from 'react';
import { useProjects } from '@/hooks/useProjects';
import ProjectLedgerRow from './ProjectLedgerRow';
import Spinner from '@/components/ui/Spinner';
import { Search, X, Layers, Filter } from 'lucide-react';
import clsx from 'clsx';

const TRACK_OPTIONS = [
  { value: '', label: 'Complete Ledger' },
  { value: 'flagship', label: 'Primary Flagships' },
  { value: 'incubating', label: 'Incubation Track' },
  { value: 'research', label: 'Applied Research' },
  { value: 'community', label: 'Community Collective' },
];

const CATEGORY_OPTIONS = [
  'All Categories',
  'Campus Tech',
  'EdTech',
  'AI / ML',
  'GovTech',
  'FinTech',
  'Open Source',
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

  function handleCategoryChange(e) {
    const val = e.target.value;
    setVisibleCount(INITIAL_PAGE_SIZE);
    setFilter((prev) => ({
      ...prev,
      category: val === 'All Categories' ? undefined : val,
    }));
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

  const hasActiveFilters = Boolean(filter.track || filter.category || filter.search);

  return (
    <section
      id="portfolio"
      className="w-full bg-transparent py-16 sm:py-24"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-8 border-b border-pinaka-hairline pb-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
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
                Production flagships, active incubation prototypes, and applied research systems 
                curated under the Pinaka engineering baseline.
              </p>
            </div>

            {/* Quick Registry Metric */}
            <div className="flex items-center gap-3 font-mono text-xs text-pinaka-slate bg-white/90 border border-pinaka-hairline px-4 py-2 rounded-sm shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Ledger Status: <strong className="text-pinaka-stone">{total}</strong> Registered Ventures
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Track Filter Tabs */}
          <div
            className="flex flex-wrap items-center gap-1.5 border border-pinaka-hairline bg-white/90 p-1.5 shadow-sm rounded-sm"
            role="group"
            aria-label="Filter ledger by track"
          >
            {TRACK_OPTIONS.map(({ value, label }) => {
              const isActive = (filter.track ?? '') === value;
              return (
                <button
                  key={value}
                  onClick={() => handleTrackChange(value)}
                  aria-pressed={isActive}
                  className={clsx(
                    'px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer rounded-sm font-sans',
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

          {/* Search & Category Filter Controls */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={filter.category || 'All Categories'}
                onChange={handleCategoryChange}
                aria-label="Filter by industry category"
                className="appearance-none bg-white/90 border border-pinaka-hairline text-pinaka-stone text-xs font-sans px-3.5 py-2 pr-8 rounded-sm shadow-sm hover:border-pinaka-ash focus:outline-none focus:border-pinaka-saffron cursor-pointer"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-pinaka-ash">
                <Filter className="h-3 w-3" />
              </div>
            </div>

            {/* Search Input Box */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-64">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search name, tech, stack..."
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
        </div>

        {/* Dynamic Ledger Summary Bar */}
        <div className="mb-4 flex items-center justify-between text-xs font-mono text-pinaka-ash px-1">
          <div>
            Showing <strong className="text-pinaka-stone">{displayedProjects.length}</strong> of{' '}
            <strong className="text-pinaka-stone">{projects.length}</strong> matching ventures
            {hasActiveFilters && (
              <span className="ml-2 text-pinaka-saffron font-semibold">
                (Filtered view)
              </span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleResetAll}
              className="text-pinaka-saffron hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* The Ledger Container */}
        <div className="border border-pinaka-hairline bg-white/90 backdrop-blur-sm shadow-editorial">
          {/* Ledger Table Sub-Header */}
          <div className="hidden lg:grid grid-cols-12 gap-8 px-8 py-3.5 border-b border-pinaka-hairline bg-pinaka-ice/80 text-[11px] font-mono uppercase tracking-widest text-pinaka-ash">
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
              <p className="font-serif text-lg text-pinaka-crimson">
                Failed to access ledger registry.
              </p>
              <p className="text-xs text-pinaka-slate mt-1 font-mono">
                Verify internal data/projects.json integrity.
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-16 text-center">
              <p className="font-serif text-lg text-pinaka-stone">
                No active ventures found matching current criteria.
              </p>
              <p className="text-xs text-pinaka-slate mt-2 mb-4">
                Try clearing search terms or selecting a different classification track.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleResetAll}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-pinaka-ice border border-pinaka-hairline text-pinaka-stone hover:bg-pinaka-saffron hover:text-white transition-colors rounded-sm"
                >
                  <X className="h-3 w-3" />
                  Clear Filters
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

        {/* Progressive Reveal Pagination Control (Scales for 3+ products) */}
        {!isLoading && projects.length > visibleCount && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + INITIAL_PAGE_SIZE)}
              className="px-6 py-3 border border-pinaka-hairline bg-white/95 text-pinaka-stone hover:bg-pinaka-saffron hover:text-white hover:border-pinaka-saffron text-xs font-mono uppercase tracking-widest transition-all duration-200 shadow-sm cursor-pointer rounded-sm"
            >
              Show More Ventures ({projects.length - visibleCount} Remaining)
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
