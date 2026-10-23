import Link from 'next/link';
import Button from '@/components/ui/Button';
import PinakaBow from '@/components/ui/PinakaBow';
import { ArrowUpRight, ShieldCheck, Terminal, Cpu, Database } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative w-full border-b border-pinaka-hairline bg-pinaka-kailash overflow-hidden"
      aria-label="Studio Manifesto"
    >
      {/* Structural architectural background grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#1E293B 1px, transparent 1px), linear-gradient(to right, #1E293B 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
        aria-hidden="true"
      />

      {/* Decorative vertical guide border */}
      <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-[1px] bg-pinaka-hairline/60 hidden xl:block" />

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Studio Proclamation & Thesis (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Sovereign Eyebrow */}
              <div className="mb-6 inline-flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-pinaka-saffron animate-pulse" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-pinaka-saffron">
                  Foundry Specification &middot; 2026
                </span>
                <span className="text-pinaka-hairline font-mono">|</span>
                <span className="font-serif text-xs tracking-wider text-pinaka-ash">
                  The Bow of Precision
                </span>
              </div>

              {/* Title / Proclamation */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-pinaka-charcoal leading-[1.1] mb-6">
                Engineered with Precision.{' '}
                <span className="text-pinaka-saffron underline decoration-pinaka-saffron/30 underline-offset-8">
                  Sovereign
                </span>{' '}
                in Execution.
              </h1>

              {/* Thesis Statement */}
              <p className="text-base sm:text-lg text-pinaka-slate leading-relaxed mb-8 max-w-2xl font-sans">
                Named after the celestial, unwavering bow of Lord Shiva,{' '}
                <strong className="font-semibold text-pinaka-stone">Pinaka</strong> is an independent 
                venture studio and builder collective. We take ambitious prototypes—from campus operating 
                systems to deep municipal reinforcement learning—and forge them into hardened, production-grade 
                institutions.
              </p>

              {/* Core Archetypes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 border-y border-pinaka-hairline py-5">
                <div>
                  <div className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-saffron mb-1">
                    01. Zero-Hype
                  </div>
                  <p className="text-xs text-pinaka-slate leading-relaxed">
                    No vanity pitch decks. Code speaks through live traffic, verification, and uptime.
                  </p>
                </div>
                <div>
                  <div className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-saffron mb-1">
                    02. Sovereign IP
                  </div>
                  <p className="text-xs text-pinaka-slate leading-relaxed">
                    Builders retain 100% intellectual property. Pinaka provides the engineering spine.
                  </p>
                </div>
                <div>
                  <div className="font-serif text-xs font-bold uppercase tracking-wider text-pinaka-saffron mb-1">
                    03. Production Rigor
                  </div>
                  <p className="text-xs text-pinaka-slate leading-relaxed">
                    Strict lifecycle gates from discovery, through MVP, to university & municipal pilots.
                  </p>
                </div>
              </div>

              {/* Action Launchers */}
              <div className="flex flex-wrap items-center gap-4">
                <a href="#portfolio">
                  <Button variant="primary" size="lg">
                    Inspect Portfolio Ledger
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </a>
                <a href="#foundry">
                  <Button variant="outline" size="lg">
                    Incubate SIH / Hackathon Project
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Dossier & Ledger Matrix (5 cols) */}
          <div className="lg:col-span-5 bg-pinaka-chalk border border-pinaka-hairline p-8 shadow-editorial">
            {/* Dossier Header */}
            <div className="flex items-center justify-between border-b border-pinaka-hairline pb-4 mb-6">
              <div className="flex items-center gap-3">
                <PinakaBow className="h-5 w-auto text-pinaka-saffron" />
                <span className="font-serif text-sm font-bold tracking-wider uppercase text-pinaka-stone">
                  Studio Dossier
                </span>
              </div>
              <span className="font-mono text-xs bg-pinaka-saffron-wash text-pinaka-saffron-deep px-2.5 py-0.5 rounded-sm border border-pinaka-saffron/20 font-semibold">
                ACTIVE COHORT
              </span>
            </div>

            {/* Matrix Items */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start justify-between border-b border-pinaka-hairline/60 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-pinaka-ash">
                  Classification
                </span>
                <span className="text-xs font-semibold text-pinaka-stone text-right">
                  Independent Venture Foundry
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-pinaka-hairline/60 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-pinaka-ash">
                  Active Ventures
                </span>
                <span className="text-xs font-semibold text-pinaka-stone text-right">
                  03 Systems (Opendoor, SkillSphere, Intelli-Light)
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-pinaka-hairline/60 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-pinaka-ash">
                  Domain Vectors
                </span>
                <span className="text-xs font-semibold text-pinaka-stone text-right">
                  Campus PropTech &middot; GovTech &middot; MARL
                </span>
              </div>
              <div className="flex items-start justify-between border-b border-pinaka-hairline/60 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-pinaka-ash">
                  Engineering Standard
                </span>
                <span className="text-xs font-semibold text-pinaka-stone text-right font-mono">
                  PostgreSQL 15+ &middot; Argon2id &middot; NTCIP 1202
                </span>
              </div>
            </div>

            {/* Disciplines Box */}
            <div className="bg-pinaka-ice border border-pinaka-hairline/80 p-4">
              <div className="text-[11px] font-mono uppercase tracking-wider text-pinaka-slate font-semibold mb-2.5 flex items-center gap-2">
                <Terminal className="h-3.5 w-3.5 text-pinaka-saffron" />
                Foundational Technical Disciplines
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Concurrency Locks',
                  'QR-JWT Cryptography',
                  'Spatio-Temporal GNN',
                  'Fail-Safe Watchdogs',
                  'Feature-Sliced Design',
                  'HMAC Webhook Ingestion',
                ].map((spec) => (
                  <span
                    key={spec}
                    className="text-[11px] font-mono bg-pinaka-chalk text-pinaka-stone border border-pinaka-hairline px-2 py-0.5 rounded-sm"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Trust Quote */}
            <div className="mt-6 pt-4 border-t border-pinaka-hairline text-center">
              <p className="text-xs italic text-pinaka-ash font-serif">
                &ldquo;A studio with ten mediocre ideas is an overhead sink; a studio with one breakout hit is a venture empire.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
