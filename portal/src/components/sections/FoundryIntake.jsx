import Button from '@/components/ui/Button';
import PinakaBow from '@/components/ui/PinakaBow';
import { ShieldCheck, Award, GitBranch, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function FoundryIntake() {
  return (
    <section
      id="foundry"
      className="w-full border-t border-pinaka-hairline bg-pinaka-kailash py-16 sm:py-24"
      aria-labelledby="foundry-heading"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-pinaka-saffron font-semibold">
              Incubator & Community Collective &middot; Track II
            </span>
          </div>
          <h2
            id="foundry-heading"
            className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-pinaka-charcoal"
          >
            The Pinaka Foundry: Backing the Unbacked
          </h2>
          <p className="mt-2 text-sm text-pinaka-slate max-w-3xl font-sans leading-relaxed">
            New founders and student builders struggle to raise capital or win institutional enterprise pilots 
            due to a lack of institutional credibility. Pinaka provides the parent engineering spine, architectural 
            standards, and collective brand credibility while you build.
          </p>
        </div>

        {/* 3 Foundation Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Pillar 1: Smart India Hackathon & Hackathon Track */}
          <div className="border border-pinaka-hairline bg-pinaka-chalk p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Track 2.1 &middot; SIH Rescue
                </span>
                <Award className="h-5 w-5 text-pinaka-saffron" />
              </div>
              <h3 className="font-serif text-xl font-bold text-pinaka-charcoal mb-3">
                Smart India Hackathon & Civic Prototypes
              </h3>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-6">
                Most hackathon prototypes die within two weeks of event completion. Pinaka identifies high-potential 
                ministry and civic problem solutions, stabilizes their architecture, and packages them into pilot-ready SaaS.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-pinaka-stone border-t border-pinaka-hairline pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Validated ministry problem statements
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Zero-cost staging and cloud deployment
              </li>
            </ul>
          </div>

          {/* Pillar 2: Peer & Friends Collective */}
          <div className="border border-pinaka-hairline bg-pinaka-chalk p-8 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-pinaka-saffron uppercase tracking-widest">
                  Track 2.2 &middot; Peer Showcase
                </span>
                <GitBranch className="h-5 w-5 text-pinaka-saffron" />
              </div>
              <h3 className="font-serif text-xl font-bold text-pinaka-charcoal mb-3">
                Peer Ventures & Friends&apos; Projects
              </h3>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed mb-6">
                Have an ambitious system built by you or your peers? Join Pinaka as a community venture. 
                Gain exposure on the Pinaka ledger and access shared infrastructure without starting from zero credibility.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-pinaka-stone border-t border-pinaka-hairline pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Cross-product traffic & shared user bases
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Automated security & code reviews
              </li>
            </ul>
          </div>

          {/* Pillar 3: Sovereign IP Guarantee */}
          <div className="border border-pinaka-hairline bg-pinaka-chalk p-8 shadow-sm flex flex-col justify-between">
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
                Pinaka does not hold your source code hostage. Creators retain complete IP ownership under our 
                Contributor Agreement. Pinaka acts as the distribution, quality assurance, and engineering umbrella.
              </p>
            </div>
            <ul className="space-y-2 text-xs text-pinaka-stone border-t border-pinaka-hairline pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Formal written contributor protection
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-pinaka-saffron shrink-0" />
                Exit freedom: Spin off independently anytime
              </li>
            </ul>
          </div>

        </div>

        {/* Action Callout Box */}
        <div id="charter" className="border border-pinaka-hairline bg-pinaka-chalk p-8 sm:p-12 shadow-editorial flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <PinakaBow className="h-4 w-auto text-pinaka-saffron" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-pinaka-saffron">
                Ready to Submit a Candidate System?
              </span>
            </div>
            <h4 className="font-serif text-2xl font-bold text-pinaka-charcoal mb-2">
              Review the Onboarding Pack & Submit Your Brief
            </h4>
            <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed">
              Every prospective project completes a Gate 1 Problem Brief and Gate 2 Opportunity Evaluation. 
              Review the templates in <code className="font-mono text-pinaka-saffron bg-pinaka-ice px-1 py-0.5 rounded-sm">templates/</code> to qualify for the Pinaka roster.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="mailto:contact@pinaka.dev?subject=Pinaka%20Venture%20Candidate%20Submission"
              className="inline-block"
            >
              <Button variant="primary" size="lg">
                Submit Candidate Brief
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
