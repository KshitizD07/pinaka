import { getAllProjects } from '@/lib/projects';

function deriveStats(projects) {
  const tracks = new Set(projects.map((p) => p.track)).size;
  const categories = new Set(projects.map((p) => p.category)).size;

  return [
    {
      devanagari: '०१',
      value: `0${projects.length}`,
      title: 'Active Ventures',
      subtitle: 'Engineered & Deployed Systems',
      highlight: 'Opendoor &middot; SkillSphere &middot; Intelli-Light',
    },
    {
      devanagari: '०२',
      value: `0${tracks}`,
      title: 'Studio Tracks',
      subtitle: 'Commercial Flagship & Research Labs',
      highlight: 'Campus PropTech & Municipal DeepTech',
    },
    {
      devanagari: '०३',
      value: '100%',
      title: 'Sovereign IP',
      subtitle: 'Builder Ownership Protected',
      highlight: 'Founders own source & data rights',
    },
    {
      devanagari: '०४',
      value: 'Gate 4',
      title: 'Deployment Maturity',
      subtitle: 'Pre-Pilot Production Validation',
      highlight: 'Full test pyramid & CI/CD standard',
    },
  ];
}

export default function StatsBar() {
  const projects = getAllProjects();
  const stats = deriveStats(projects);

  return (
    <section
      className="w-full border-b border-pinaka-hairline bg-pinaka-chalk"
      aria-label="Studio Statistics & Performance Matrix"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-pinaka-hairline">
          {stats.map(({ devanagari, value, title, subtitle, highlight }) => (
            <div
              key={title}
              className="py-6 sm:py-8 px-4 sm:first:pl-0 sm:last:pr-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-pinaka-ash tracking-widest uppercase">
                    Vector {devanagari}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-pinaka-saffron" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-pinaka-charcoal mb-1">
                  {value}
                </div>
                <div className="font-sans text-xs font-bold uppercase tracking-wider text-pinaka-stone mb-0.5">
                  {title}
                </div>
                <div className="text-xs text-pinaka-slate mb-3">
                  {subtitle}
                </div>
              </div>
              <div className="pt-2 border-t border-pinaka-hairline/60 text-[11px] font-mono text-pinaka-saffron">
                {highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
