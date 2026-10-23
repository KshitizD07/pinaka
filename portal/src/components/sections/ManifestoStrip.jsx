import { MANIFESTO_RULES } from '@/lib/constants';

export default function ManifestoStrip() {
  return (
    <section
      className="border-t border-pinaka-border bg-pinaka-surface py-16"
      aria-labelledby="manifesto-heading"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p
          id="manifesto-heading"
          className="mb-10 text-xs font-semibold uppercase tracking-widest text-pinaka-accent"
        >
          The Pinaka Way
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MANIFESTO_RULES.map(({ id, rule, detail }, index) => (
            <div key={id} className="flex flex-col gap-3">
              <span className="text-4xl font-black text-pinaka-ink-faint">
                0{index + 1}
              </span>
              <h3 className="text-base font-bold text-pinaka-ink">{rule}</h3>
              <p className="text-sm leading-relaxed text-pinaka-ink-muted">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
