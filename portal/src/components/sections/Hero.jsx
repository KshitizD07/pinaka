import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ArrowRight, Users } from 'lucide-react';

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[90vh] items-center border-b border-pinaka-border bg-pinaka-void"
      aria-label="Hero"
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#6C63FF 1px, transparent 1px), linear-gradient(to right, #6C63FF 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6 py-24 lg:py-32">
        {/* Eyebrow */}
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-pinaka-accent/30 bg-pinaka-accent/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-pinaka-accent">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-pinaka-accent" aria-hidden="true" />
          Venture Studio · Builder Collective
        </p>

        {/* Headline */}
        <h1 className="mb-6 max-w-4xl text-5xl font-extrabold leading-tight tracking-tight text-pinaka-ink lg:text-7xl">
          Build Bold.{' '}
          <span className="text-pinaka-accent">Ship Real.</span>
        </h1>

        {/* Sub-headline */}
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-pinaka-ink-muted lg:text-xl">
          Pinaka is a venture studio and builder collective where ambitious engineers turn
          hard problems into production-grade products. No hype. No slides. Just execution.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <a href="#portfolio" aria-label="Explore our portfolio">
            <Button variant="primary" size="lg">
              Explore Portfolio
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </a>
          <Link href="/join" aria-label="Join Pinaka studio">
            <Button variant="outline" size="lg">
              <Users className="h-4 w-4" aria-hidden="true" />
              Join Pinaka
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
