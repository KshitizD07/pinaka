'use client';

import Link from 'next/link';
import PinakaBow from '@/components/ui/PinakaBow';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '/#portfolio', label: 'Portfolio Ledger' },
  { href: '/#foundry', label: 'Foundry & Incubation' },
  { href: '/#codex', label: 'Engineering Codex' },
  { href: '/onboard', label: 'Onboarding Guide' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-pinaka-hairline bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16 py-4">
        {/* Brand identity */}
        <Link
          href="/"
          className="group flex items-center gap-3.5"
          aria-label="Pinaka Studios Home"
        >
          <div className="flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105">
            <PinakaBow className="h-5 w-auto text-pinaka-saffron" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-bold tracking-widest text-pinaka-stone">
                PINAKA
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase text-pinaka-ash font-mono -mt-0.5">
              Product Studio &middot; Labs
            </span>
          </div>
        </Link>

        {/* Navigation links */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-xs font-semibold uppercase tracking-wider text-pinaka-slate hover:text-pinaka-saffron transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Action button */}
        <div className="flex items-center gap-4">
          <Link href="/onboard">
            <Button variant="primary" size="sm">
              Submit Candidate
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
