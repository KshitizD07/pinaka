'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PinakaBow from '@/components/ui/PinakaBow';
import Button from '@/components/ui/Button';
import { Menu, X, ArrowLeft } from 'lucide-react';

const NAV_LINKS = [
  { href: '/#portfolio', label: 'Ecosystem Portfolio' },
  { href: '/#foundry', label: 'How It Works' },
  { href: '/#principles', label: 'Guiding Principles' },
  { href: '/onboard', label: 'Submit Project' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pinaka-hairline bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-16 py-3.5 sm:py-4">
        {/* Brand identity */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 sm:gap-3.5"
          aria-label="Pinaka Ecosystem Home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex items-center justify-center p-1 sm:p-1.5 transition-transform duration-200 group-hover:scale-105 shrink-0">
            <PinakaBow className="h-4.5 sm:h-5 w-auto text-pinaka-saffron" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 sm:gap-2">
              <span className="font-serif text-base sm:text-lg font-bold tracking-widest text-pinaka-stone">
                PINAKA
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-pinaka-ash font-mono -mt-0.5">
              Curated Project Ecosystem
            </span>
          </div>
        </Link>

        {/* Desktop Navigation links */}
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

        {/* Desktop Action button & Mobile toggle */}
        <div className="flex items-center gap-3">
          <Link href="/onboard" className="hidden sm:inline-block">
            <Button variant="primary" size="sm">
              Apply to Showcase
            </Button>
          </Link>

          {/* Mobile back link if not on home */}
          {pathname !== '/' && (
            <Link
              href="/"
              className="lg:hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono uppercase tracking-wider text-pinaka-stone bg-pinaka-ice border border-pinaka-hairline hover:border-pinaka-saffron hover:text-pinaka-saffron rounded-sm"
              aria-label="Return to Pinaka Home"
            >
              <ArrowLeft className="h-3.5 w-3.5 text-pinaka-saffron" />
              <span>Home</span>
            </Link>
          )}

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-sm text-pinaka-slate hover:text-pinaka-charcoal hover:bg-pinaka-ice border border-pinaka-hairline/80 focus:outline-none"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer / dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-pinaka-hairline bg-white/95 backdrop-blur-md px-4 py-5 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3 pb-4 border-b border-pinaka-hairline">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-semibold tracking-wide text-pinaka-saffron flex items-center gap-2 py-2 px-1 transition-colors border-b border-pinaka-hairline/60 mb-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Pinaka Home
            </Link>
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wide text-pinaka-stone hover:text-pinaka-saffron py-2 px-1 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="pt-4">
            {pathname === '/onboard' ? (
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block"
              >
                <Button variant="outline" size="md" className="w-full">
                  Return to Portfolio
                </Button>
              </Link>
            ) : (
              <Link
                href="/onboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block"
              >
                <Button variant="primary" size="md" className="w-full">
                  Apply to Showcase
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
