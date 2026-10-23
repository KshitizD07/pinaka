import Link from 'next/link';
import PinakaBow from '@/components/ui/PinakaBow';

const VENTURE_LINKS = [
  { href: '#portfolio', label: 'Opendoor &middot; Campus PropTech' },
  { href: '#portfolio', label: 'SkillSphere &middot; Verified EdTech' },
  { href: '#portfolio', label: 'Intelli-Light &middot; ST-MARL Traffic' },
];

const GOVERNANCE_LINKS = [
  { href: '#codex', label: 'The Engineering Codex' },
  { href: '#foundry', label: 'SIH & Hackathon Incubation' },
  { href: '#charter', label: 'Contributor IP Agreement' },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-pinaka-hairline bg-pinaka-chalk text-pinaka-stone">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 py-16 sm:py-20">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-pinaka-hairline pb-12">
          
          {/* Brand & Namesake (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <PinakaBow className="h-6 w-auto text-pinaka-saffron" />
                <span className="font-serif text-xl font-bold tracking-widest text-pinaka-charcoal">
                  PINAKA
                </span>
                <span className="text-xs font-semibold text-pinaka-saffron tracking-wider">
                  ॥ पिनाक ॥
                </span>
              </div>
              <p className="text-xs sm:text-sm text-pinaka-slate leading-relaxed max-w-sm mb-4 font-sans">
                Named after the celestial, unwavering bow of Lord Shiva (Rudra). An independent 
                venture studio and builder collective engineering production-grade software 
                across enterprise campus systems, deeptech, and civic technology.
              </p>
            </div>
            <div className="font-mono text-xs text-pinaka-ash">
              Foundry Coordinates &middot; 28&deg;36&apos;N 77&deg;12&apos;E
            </div>
          </div>

          {/* Active Ventures (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-pinaka-charcoal mb-4">
              Active Studio Ventures
            </h4>
            <ul className="space-y-3 font-sans text-xs">
              {VENTURE_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-pinaka-slate hover:text-pinaka-saffron transition-colors block"
                    dangerouslySetInnerHTML={{ __html: label }}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Governance & Collective (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-pinaka-charcoal mb-4">
              Studio Governance
            </h4>
            <ul className="space-y-3 font-sans text-xs">
              {GOVERNANCE_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-pinaka-slate hover:text-pinaka-saffron transition-colors block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-pinaka-ash">
          <div>
            &copy; {new Date().getFullYear()} Pinaka Studios &middot; Independent Product Studio &middot; All Rights Reserved.
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
