import Link from 'next/link';
import PinakaBow from '@/components/ui/PinakaBow';

const VENTURE_LINKS = [
  { href: '/#portfolio', label: 'SkillSphere &middot; Verified EdTech' },
  { href: '/#portfolio', label: 'Opendoor &middot; Campus Infrastructure' },
  { href: '/#portfolio', label: 'Intelli-Light &middot; Adaptive Systems' },
];

const GOVERNANCE_LINKS = [
  { href: '/#codex', label: 'The Engineering Codex' },
  { href: '/#foundry', label: 'Foundry & Incubation' },
  { href: '/onboard', label: 'Candidate Onboarding Guide' },
  { href: '/#charter', label: 'Contributor IP Agreement' },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-pinaka-hairline bg-white/80 backdrop-blur-sm text-pinaka-stone">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-16 py-12 sm:py-16 lg:py-20">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 sm:gap-12 border-b border-pinaka-hairline pb-10 sm:pb-12">
          
          {/* Brand & Overview (5 cols) */}
          <div className="sm:col-span-2 md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <PinakaBow className="h-5 sm:h-6 w-auto text-pinaka-saffron shrink-0" />
                <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-pinaka-charcoal">
                  PINAKA
                </span>
              </div>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed max-w-sm mb-4 font-sans">
                An independent product studio and builder collective engineering production-grade 
                software across enterprise infrastructure, deeptech, and applied software.
              </p>
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-pinaka-ash">
              Built with precision and verifiable discipline.
            </div>
          </div>

          {/* Active Ventures (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-pinaka-charcoal mb-3 sm:mb-4">
              Studio Ventures
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs">
              {VENTURE_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-pinaka-slate hover:text-pinaka-saffron transition-colors block py-0.5"
                    dangerouslySetInnerHTML={{ __html: label }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Governance & Collective (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-pinaka-charcoal mb-3 sm:mb-4">
              Studio Governance
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs">
              {GOVERNANCE_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-pinaka-slate hover:text-pinaka-saffron transition-colors block py-0.5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs font-mono text-pinaka-ash text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Pinaka Studios &middot; Product Studio &middot; All Rights Reserved.
          </div>
          <div className="flex items-center gap-2 text-pinaka-slate">
            <span>Sovereign Code</span>
            <span>&middot;</span>
            <span>Zero Compromise</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
