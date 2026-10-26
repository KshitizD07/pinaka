import Link from 'next/link';
import PinakaBow from '@/components/ui/PinakaBow';
import { getAllProjects } from '@/lib/projects';

const GOVERNANCE_LINKS = [
  { href: '/#principles', label: 'Brand & Operating Principles' },
  { href: '/#foundry', label: 'How the Ecosystem Works' },
  { href: '/onboard', label: 'Creator Application Guide' },
  { href: '/onboard#rights', label: 'Creator Rights & IP Policy' },
];

export default function Footer() {
  const projects = getAllProjects();

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
                A curated ecosystem for ambitious ideas, promising projects, and emerging ventures.
                Helping creators gain visibility and connecting talent to build what matters.
              </p>
            </div>
            <div className="font-mono text-[11px] sm:text-xs text-pinaka-ash">
              Curated review &middot; 100% creator ownership.
            </div>
          </div>

          {/* Dynamic Curated Works (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-pinaka-charcoal mb-3 sm:mb-4">
              Curated Portfolio ({projects.length})
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 font-sans text-xs">
              {projects.map((p) => (
                <li key={p.id || p.name}>
                  <Link
                    href="/#portfolio"
                    className="text-pinaka-slate hover:text-pinaka-saffron transition-colors block py-0.5"
                  >
                    <span className="font-semibold text-pinaka-stone">{p.name}</span>
                    <span className="text-pinaka-ash"> &middot; {p.tagline.slice(0, 40)}...</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Governance & Pathways (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-pinaka-charcoal mb-3 sm:mb-4">
              Ecosystem & Principles
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
            &copy; {new Date().getFullYear()} Pinaka Ecosystem &middot; A home for ambitious ideas &middot; All Rights Reserved.
          </div>
          <div className="flex items-center gap-2 text-pinaka-slate">
            <span>Discover ideas</span>
            <span>&middot;</span>
            <span>Connect talent</span>
            <span>&middot;</span>
            <span>Build what matters</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
