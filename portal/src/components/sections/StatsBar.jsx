import { getAllProjects } from '@/lib/projects';

function deriveStats(projects) {
  const tracks = new Set(projects.map((p) => p.track)).size;

  return [
    {
      index: '01',
      value: `0${projects.length}`,
      title: 'Curated Works',
      subtitle: 'Ideas, Prototypes & Ventures',
      highlight: 'Manually Reviewed Cohort',
    },
    {
      index: '02',
      value: `0${tracks}`,
      title: 'Ecosystem Categories',
      subtitle: 'From Concepts to Live Products',
      highlight: 'Structured Portfolio Model',
    },
    {
      index: '03',
      value: '100%',
      title: 'Creator Ownership',
      subtitle: 'Zero Equity or IP Transfers',
      highlight: 'Creators retain full credit & rights',
    },
    {
      index: '04',
      value: 'SkillSphere',
      title: 'Execution Pathway',
      subtitle: 'Team Formation & Discovery',
      highlight: 'Collaborative execution support',
    },
  ];
}

export default function StatsBar() {
  const projects = getAllProjects();
  const stats = deriveStats(projects);

  return (
    <section
      className="w-full border-b border-pinaka-hairline bg-white/80 backdrop-blur-sm"
      aria-label="Ecosystem Scope & Operating Metrics"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y-0 sm:divide-x divide-pinaka-hairline gap-y-6 sm:gap-y-0 py-2 sm:py-0">
          {stats.map(({ index, value, title, subtitle, highlight }, i) => (
            <div
              key={title}
              className={`py-4 sm:py-8 px-2 sm:px-4 flex flex-col justify-between ${
                i % 2 === 1 ? 'border-l border-pinaka-hairline sm:border-l-0' : ''
              } sm:first:pl-0 sm:last:pr-0`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="font-mono text-[10px] sm:text-xs text-pinaka-ash tracking-widest uppercase">
                    Dimension {index}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-pinaka-saffron" />
                </div>
                <div className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-pinaka-charcoal mb-0.5 sm:mb-1">
                  {value}
                </div>
                <div className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-pinaka-stone mb-0.5">
                  {title}
                </div>
                <div className="text-[11px] sm:text-xs text-pinaka-slate mb-2 sm:mb-3 leading-snug">
                  {subtitle}
                </div>
              </div>
              <div className="pt-2 border-t border-pinaka-hairline/60 text-[10px] sm:text-[11px] font-mono text-pinaka-saffron font-medium">
                {highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
