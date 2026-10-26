import { MANIFESTO_RULES } from '@/lib/constants';
import PinakaBow from '@/components/ui/PinakaBow';

export default function ManifestoStrip() {
  return (
    <section
      id="principles"
      className="w-full border-t border-pinaka-hairline bg-white/80 backdrop-blur-sm py-12 sm:py-20 lg:py-24"
      aria-labelledby="principles-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
        
        {/* Section Header (§1.6 Brand Principles) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-pinaka-hairline pb-5 sm:pb-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PinakaBow className="h-4 w-auto text-pinaka-saffron shrink-0" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-pinaka-saffron font-semibold">
                Section 1.6 &middot; Ecosystem Principles
              </span>
            </div>
            <h2
              id="principles-heading"
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-pinaka-charcoal"
            >
              The Four Guiding Principles of Pinaka
            </h2>
          </div>
          <div className="mt-3 sm:mt-0 font-mono text-[11px] sm:text-xs text-pinaka-ash">
            Ref: Strategy, Identity & Operating Document
          </div>
        </div>

        {/* 4 Brand Principle Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-pinaka-hairline border-b border-pinaka-hairline pb-8 sm:pb-12">
          {MANIFESTO_RULES.map(({ num, code, rule, description }) => (
            <div
              key={num}
              className="py-6 md:py-0 md:px-8 first:pl-0 last:pr-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="font-mono text-xs font-bold text-pinaka-saffron tracking-widest">
                    PRINCIPLE {code} / {num}
                  </span>
                  <span className="text-[10px] font-mono text-pinaka-ash uppercase tracking-wider">
                    Operating Rule
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-pinaka-charcoal leading-snug mb-2 sm:mb-3">
                  {rule}
                </h3>

                <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed font-sans">
                  {description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-pinaka-hairline/60">
                <span className="text-[10px] font-mono uppercase text-pinaka-ash tracking-widest">
                  Operating Standard
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
