import Link from 'next/link';
import { Zap } from 'lucide-react';

const FOOTER_LINKS = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#labs', label: 'Labs' },
  { href: '/join', label: 'Join Pinaka' },
];

export default function Footer() {
  return (
    <footer className="border-t border-pinaka-border bg-pinaka-void">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-pinaka-ink">
              <Zap className="h-4 w-4 text-pinaka-accent" aria-hidden="true" />
              <span className="font-bold tracking-tight">PINAKA</span>
            </div>
            <p className="max-w-xs text-sm text-pinaka-ink-muted">
              A venture studio for builders who ship. We build bold products that solve real
              problems.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6" role="list">
              {FOOTER_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-pinaka-ink-muted transition-colors hover:text-pinaka-ink"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-pinaka-border pt-6 text-center">
          <p className="text-xs text-pinaka-ink-faint">
            © 2026 Pinaka Studios. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
