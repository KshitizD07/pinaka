'use client';

import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun, Zap } from 'lucide-react';

const NAV_LINKS = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#labs', label: 'Labs' },
  { href: '/join', label: 'Join' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-pinaka-border bg-pinaka-void/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        aria-label="Main navigation"
      >
        {/* Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2 text-pinaka-ink hover:text-pinaka-accent transition-colors"
          aria-label="Pinaka home"
        >
          <Zap className="h-5 w-5 text-pinaka-accent" aria-hidden="true" />
          <span className="text-lg font-bold tracking-tight">PINAKA</span>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-8 md:flex" role="list">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-pinaka-ink-muted transition-colors hover:text-pinaka-ink"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="rounded-lg p-2 text-pinaka-ink-muted transition-colors hover:bg-pinaka-panel hover:text-pinaka-ink"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </nav>
    </header>
  );
}
