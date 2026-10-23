'use client';

import { useProjects } from '@/hooks/useProjects';
import ProjectCard from './ProjectCard';
import Spinner from '@/components/ui/Spinner';
import clsx from 'clsx';
import { TRACK_LABELS } from '@/lib/constants';

const FILTER_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'flagship', label: TRACK_LABELS.flagship },
  { value: 'research', label: TRACK_LABELS.research },
  { value: 'incubating', label: TRACK_LABELS.incubating },
  { value: 'community', label: TRACK_LABELS.community },
];

export default function PortfolioGrid() {
  const { projects, isLoading, error, filter, setFilter } = useProjects();

  function handleFilterChange(track) {
    setFilter((prev) => ({ ...prev, track: track || undefined }));
  }

  return (
    <section
      id="portfolio"
      className="bg-pinaka-void py-20"
      aria-labelledby="portfolio-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="portfolio-heading"
              className="text-3xl font-extrabold tracking-tight text-pinaka-ink"
            >
              Portfolio
            </h2>
            <p className="mt-1 text-pinaka-ink-muted">
              Products built at Pinaka, across tracks.
            </p>
          </div>

          {/* Track filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by track">
            {FILTER_OPTIONS.map(({ value, label }) => {
              const isActive = (filter.track ?? '') === value;
              return (
                <button
                  key={value}
                  onClick={() => handleFilterChange(value)}
                  aria-pressed={isActive}
                  className={clsx(
                    'rounded-full border px-4 py-1.5 text-xs font-medium transition-colors',
                    isActive
                      ? 'border-pinaka-accent bg-pinaka-accent/10 text-pinaka-accent'
                      : 'border-pinaka-border bg-transparent text-pinaka-ink-muted hover:border-pinaka-ink-muted hover:text-pinaka-ink'
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-pinaka-ember/30 bg-pinaka-ember/5 px-6 py-10 text-center">
            <p className="text-pinaka-ember">Failed to load projects. Please try again.</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-pinaka-border bg-pinaka-surface px-6 py-16 text-center">
            <p className="text-pinaka-ink-muted">No projects found for this filter.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
