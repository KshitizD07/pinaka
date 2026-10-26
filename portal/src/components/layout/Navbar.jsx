'use client';

import { useState } from 'react';
import Link from 'next/link';
import PinakaBow from '@/components/ui/PinakaBow';
import Button from '@/components/ui/Button';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/#portfolio', label: 'Ecosystem Portfolio' },
  { href: '/#foundry', label: 'How It Works' },
  { href: '/#principles', label: 'Guiding Principles' },
  { href: '/onboard', label: 'Submit Project' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <Link
              href="/onboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full block"
            >
              <Button variant="primary" size="md" className="w-full">
                Apply to Showcase
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
