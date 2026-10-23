import Button from '@/components/ui/Button';
import PinakaBow from '@/components/ui/PinakaBow';
import { ShieldCheck, Layers, GitBranch, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function FoundryIntake() {
  return (
    <section
      id="foundry"
      className="w-full border-t border-pinaka-hairline bg-transparent py-16 sm:py-24"
      aria-labelledby="foundry-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-pinaka-saffron font-semibold">
              The Foundry &middot; Builder Collective
            </span>
          </div>
          <h2
            id="foundry-heading"
            className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-pinaka-charcoal"
          >
            The Pinaka Foundry: Backing High-Potential Products
          </h2>
          <p className="mt-2 text-sm text-pinaka-slate max-w-3xl font-sans leading-relaxed">
            Early-stage software and new builder initiatives often struggle for initial traction and institutional 
            trust due to a lack of backing. Pinaka operates as a supportive umbrella, providing engineering standards, 
            infrastructure baselines, and shared credibility to help promising products succeed.
          </p>
        </div>

        {/* 3 Foundation Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Pillar 1: Prototype Incubation */}
          <div className="border border-pinaka-hairline bg-white/90 backdrop-blur-sm p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Track 2.1 &middot; Prototype Hardening
                </span>
                <Layers className="h-5 w-5 text-pinaka-saffron" />
              </div>
              <h3 className="font-serif text-xl font-bold text-pinaka-charcoal mb-3">
                Early-Stage Product Incubation
              </h3>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-6">
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
          <div className="border border-pinaka-hairline bg-white/90 backdrop-blur-sm p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Track 2.2 &middot; Peer Ventures
                </span>
                <GitBranch className="h-5 w-5 text-pinaka-saffron" />
              </div>
              <h3 className="font-serif text-xl font-bold text-pinaka-charcoal mb-3">
                Community Showcase & Credibility
              </h3>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-6">
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
          <div className="border border-pinaka-hairline bg-white/90 backdrop-blur-sm p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Track 2.3 &middot; Contributor Rights
                </span>
                <ShieldCheck className="h-5 w-5 text-pinaka-saffron" />
              </div>
              <h3 className="font-serif text-xl font-bold text-pinaka-charcoal mb-3">
                100% Builder IP Retention
              </h3>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-6">
                You retain complete intellectual property rights to your code and products. 
                Under our Contributor Agreement, Pinaka serves as the distribution, quality assurance, 
                and engineering partner without seizing code ownership.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-pinaka-stone border-t border-pinaka-hairline pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Formal written contributor protection
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Full independence to spin off anytime
              </li>
            </ul>
          </div>

        </div>

        {/* Action Callout Box */}
        <div id="charter" className="border border-pinaka-hairline bg-white/95 backdrop-blur-sm p-8 sm:p-12 shadow-editorial flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <PinakaBow className="h-4 w-auto text-pinaka-saffron" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-pinaka-saffron">
                Ready to Propose a Project?
              </span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-pinaka-charcoal mb-2">
              Review the Onboarding Standards & Connect
            </h4>
            <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed">
              Every prospective product completes a standard Problem Brief and Opportunity Evaluation. 
              Review the governance templates in <code className="font-mono text-pinaka-saffron bg-pinaka-ice px-1 py-0.5 rounded-sm">templates/</code> to explore showcasing under Pinaka.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:contact@pinaka.dev?subject=Pinaka%20Project%20Candidate%20Submission"
              className="inline-block"
            >
              <Button variant="primary" size="lg">
                Submit Candidate Project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
