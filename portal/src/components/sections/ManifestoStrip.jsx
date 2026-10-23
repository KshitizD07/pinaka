import { MANIFESTO_RULES } from '@/lib/constants';
import PinakaBow from '@/components/ui/PinakaBow';

export default function ManifestoStrip() {
  return (
    <section
      id="codex"
      className="w-full border-t border-pinaka-hairline bg-pinaka-chalk py-16 sm:py-24"
      aria-labelledby="codex-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-pinaka-hairline pb-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PinakaBow className="h-4 w-auto text-pinaka-saffron" />
              <span className="font-mono text-xs uppercase tracking-widest text-pinaka-saffron font-semibold">
                The Engineering Codex &middot; Studio Laws
              </span>
            </div>
            <h2
              id="codex-heading"
              className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-pinaka-charcoal"
            >
              The Four Invariable Pillars of Pinaka
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 font-mono text-xs text-pinaka-ash">
            Ref: 01-engineering-handbook.md &middot; 08-lifecycle-gates.md
          </div>
        </div>

        {/* 4 Architectural Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-pinaka-hairline border-b border-pinaka-hairline pb-12">
          {MANIFESTO_RULES.map(({ num, devanagari, rule, description }) => (
            <div
              key={num}
              className="py-8 md:py-0 md:px-8 first:pl-0 last:pr-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-pinaka-saffron tracking-widest">
                    LAW {devanagari} / {num}
                  </span>
                  <span className="text-[10px] font-mono text-pinaka-ash uppercase tracking-wider">
                    Institutional Standard
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-pinaka-charcoal leading-snug mb-3">
                  {rule}
                </h3>

                <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed font-sans">
                  {description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-pinaka-hairline/60">
                <span className="text-[10px] font-mono uppercase text-pinaka-ash tracking-widest">
                  Non-Negotiable Gate
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
