import Link from 'next/link';
import Button from '@/components/ui/Button';
import PinakaBow from '@/components/ui/PinakaBow';
import { ShieldCheck, Layers, GitBranch, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function FoundryIntake() {
  return (
    <section
      id="foundry"
      className="w-full border-t border-pinaka-hairline bg-transparent py-12 sm:py-20 lg:py-24"
      aria-labelledby="foundry-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-pinaka-saffron font-semibold">
              The Foundry &middot; Builder Collective
            </span>
          </div>
          <h2
            id="foundry-heading"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-pinaka-charcoal"
          >
            The Pinaka Foundry: Backing High-Potential Products
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-pinaka-slate max-w-3xl font-sans leading-relaxed">
            Early-stage software and new builder initiatives often struggle for initial traction and institutional 
            trust due to a lack of backing. Pinaka operates as a supportive umbrella, providing engineering standards, 
            infrastructure baselines, and shared credibility to help promising products succeed.
          </p>
        </div>

        {/* 3 Foundation Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          
          {/* Pillar 1: Prototype Incubation */}
          <div className="border border-pinaka-hairline bg-white/90 backdrop-blur-sm p-5 sm:p-8 shadow-sm rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Track 2.1 &middot; Prototype Hardening
                </span>
                <Layers className="h-4.5 sm:h-5 w-4.5 sm:w-5 text-pinaka-saffron shrink-0" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-pinaka-charcoal mb-2 sm:mb-3">
                Early-Stage Product Incubation
              </h3>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-5 sm:mb-6">
                Have a functional prototype or ambitious project? Pinaka stabilizes your architecture, establishes 
                continuous deployment pipelines, and prepares your software for live pilots.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-pinaka-stone border-t border-pinaka-hairline pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Validated problem-solving focus
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Production-grade infrastructure baseline
              </li>
            </ul>
          </div>

          {/* Pillar 2: Peer Ventures */}
          <div className="border border-pinaka-hairline bg-white/90 backdrop-blur-sm p-5 sm:p-8 shadow-sm rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Track 2.2 &middot; Peer Ventures
                </span>
                <GitBranch className="h-4.5 sm:h-5 w-4.5 sm:w-5 text-pinaka-saffron shrink-0" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-pinaka-charcoal mb-2 sm:mb-3">
                Community Showcase & Credibility
              </h3>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-5 sm:mb-6">
                Ambitious projects built by peers and independent developers can join under the Pinaka umbrella. 
                Gain exposure on our central ledger and leverage collective reputation instead of building credibility alone.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-pinaka-stone border-t border-pinaka-hairline pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Cross-product discoverability
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Peer engineering review and feedback
              </li>
            </ul>
          </div>

          {/* Pillar 3: Sovereign IP Guarantee */}
          <div className="border border-pinaka-hairline bg-white/90 backdrop-blur-sm p-5 sm:p-8 shadow-sm rounded-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="font-mono text-[11px] sm:text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Track 2.3 &middot; Contributor Rights
                </span>
                <ShieldCheck className="h-4.5 sm:h-5 w-4.5 sm:w-5 text-pinaka-saffron shrink-0" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-pinaka-charcoal mb-2 sm:mb-3">
                Sovereign Builder Ownership
              </h3>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-5 sm:mb-6">
                Pinaka does not seize equity or intellectual property from community builders. You retain 
                100% control of your codebase, repositories, and future spinout paths.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-pinaka-stone border-t border-pinaka-hairline pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Complete repository and IP retention
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Independent deployment portability
              </li>
            </ul>
          </div>

        </div>

        {/* CTA Banner */}
        <div className="border border-pinaka-hairline bg-white/95 backdrop-blur-sm p-6 sm:p-10 shadow-editorial rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PinakaBow className="h-4 w-auto text-pinaka-saffron shrink-0" />
              <span className="font-serif text-xs font-bold tracking-wider uppercase text-pinaka-stone">
                Foundry Intake Portal
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-pinaka-charcoal">
              Submit your project to the collective.
            </h3>
            <p className="text-xs sm:text-sm text-pinaka-slate mt-1 max-w-xl font-sans">
              Follow our onboarding protocol to submit your problem brief and join the ledger.
            </p>
          </div>
          <Link href="/onboard" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Open Candidate Guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
