import Badge from '@/components/ui/Badge';
import { ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

/**
 * Project card component.
 * @param {Object} props
 * @param {Object} props.project - Project data from registry
 */
export default function ProjectCard({ project }) {
  const {
    name,
    tagline,
    track,
    status,
    category,
    techStack,
    highlights,
    demoUrl,
    repoUrl,
  } = project;

  return (
    <article
      className={clsx(
        'group flex flex-col rounded-xl border border-pinaka-border bg-pinaka-surface p-6',
        'transition-all duration-200 hover:-translate-y-1 hover:border-pinaka-accent/40 hover:shadow-lg hover:shadow-pinaka-accent/5'
      )}
      aria-label={`${name} project card`}
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="track" value={track} />
          <Badge variant="status" value={status} />
        </div>
        <span className="shrink-0 text-xs text-pinaka-ink-faint">{category}</span>
      </div>

      {/* Title & tagline */}
      <h3 className="mb-1 text-lg font-bold text-pinaka-ink">{name}</h3>
      <p className="mb-5 text-sm leading-relaxed text-pinaka-ink-muted">{tagline}</p>

      {/* Highlights */}
      <ul className="mb-5 space-y-2" aria-label="Key highlights">
        {highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs text-pinaka-ink-muted">
            <CheckCircle2
              className="mt-0.5 h-3.5 w-3.5 shrink-0 text-pinaka-jade"
              aria-hidden="true"
            />
            {h}
          </li>
        ))}
      </ul>

      {/* Tech stack */}
      <div className="mb-6 flex flex-wrap gap-2" aria-label="Tech stack">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-pinaka-border bg-pinaka-panel px-2 py-0.5 text-xs text-pinaka-ink-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Actions */}
      <div className="flex gap-3">
        {demoUrl ? (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-pinaka-accent/40 bg-pinaka-accent/10 px-3 py-2 text-xs font-medium text-pinaka-accent transition-colors hover:bg-pinaka-accent/20"
            aria-label={`View ${name} demo`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Live Demo
          </a>
        ) : (
          <span
            className="flex flex-1 cursor-not-allowed items-center justify-center gap-1.5 rounded-lg border border-pinaka-border px-3 py-2 text-xs text-pinaka-ink-faint"
            aria-label="Demo coming soon"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Coming Soon
          </span>
        )}

        {repoUrl ? (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-pinaka-border px-3 py-2 text-xs text-pinaka-ink-muted transition-colors hover:border-pinaka-ink-muted hover:text-pinaka-ink"
            aria-label={`View ${name} on GitHub`}
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            Repo
          </a>
        ) : (
          <span
            className="flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-pinaka-border px-3 py-2 text-xs text-pinaka-ink-faint"
            aria-label="Repo is private"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            Private
          </span>
        )}
      </div>
    </article>
  );
}
