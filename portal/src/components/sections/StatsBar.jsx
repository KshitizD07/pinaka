import { getAllProjects } from '@/lib/projects';

function deriveStats(projects) {
  const trackSet = new Set(projects.map((p) => p.track));
  const isResearch = projects.some((p) => p.track === 'research');

  return [
    { value: projects.length, label: projects.length === 1 ? 'Product' : 'Products' },
    { value: trackSet.size, label: trackSet.size === 1 ? 'Track' : 'Tracks' },
    { value: isResearch ? 1 : 0, label: 'Research Lab' },
  ];
}

export default function StatsBar() {
  const projects = getAllProjects();
  const stats = deriveStats(projects);

  return (
    <section
      className="border-b border-pinaka-border bg-pinaka-surface"
      aria-label="Studio stats"
    >
      <div className="mx-auto max-w-6xl px-6">
        <dl className="flex flex-wrap items-center justify-center divide-x divide-pinaka-border md:justify-start">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center px-10 py-6 first:pl-0 last:pr-0 md:items-start"
            >
              <dt className="sr-only">{label}</dt>
              <dd className="text-3xl font-extrabold text-pinaka-ink">{value}</dd>
              <span className="mt-1 text-xs font-medium uppercase tracking-wider text-pinaka-ink-muted">
                {label}
              </span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
