/** Valid track values */
export const TRACKS = ['flagship', 'research', 'incubating', 'community'];

/** Valid status values */
export const STATUSES = [
  'concept',
  'prototype',
  'mvp',
  'pilot',
  'live',
  'paused',
  'archived',
];

/** Valid category values */
export const CATEGORIES = [
  'Campus Tech',
  'GovTech',
  'EdTech',
  'AI / ML',
  'FinTech',
  'Open Source',
  'Research',
];

/** Human-readable track labels */
export const TRACK_LABELS = {
  flagship: 'Flagship',
  research: 'Research',
  incubating: 'Incubating',
  community: 'Community',
};

/** Human-readable status labels */
export const STATUS_LABELS = {
  concept: 'Concept',
  prototype: 'Prototype',
  mvp: 'MVP',
  pilot: 'Pilot',
  live: 'Live',
  paused: 'Paused',
  archived: 'Archived',
};

/**
 * Tailwind color classes for status badges.
 * bg / text combos that work on pinaka-surface backgrounds.
 */
export const STATUS_COLORS = {
  concept: {
    bg: 'bg-pinaka-ink-faint/30',
    text: 'text-pinaka-ink-muted',
    border: 'border-pinaka-ink-faint',
  },
  prototype: {
    bg: 'bg-pinaka-gold/10',
    text: 'text-pinaka-gold',
    border: 'border-pinaka-gold/30',
  },
  mvp: {
    bg: 'bg-pinaka-accent/10',
    text: 'text-pinaka-accent',
    border: 'border-pinaka-accent/30',
  },
  pilot: {
    bg: 'bg-pinaka-jade/10',
    text: 'text-pinaka-jade',
    border: 'border-pinaka-jade/30',
  },
  live: {
    bg: 'bg-pinaka-jade/20',
    text: 'text-pinaka-jade',
    border: 'border-pinaka-jade/50',
  },
  paused: {
    bg: 'bg-pinaka-ember/10',
    text: 'text-pinaka-ember',
    border: 'border-pinaka-ember/30',
  },
  archived: {
    bg: 'bg-pinaka-ember/5',
    text: 'text-pinaka-ink-faint',
    border: 'border-pinaka-ember/20',
  },
};

/** Pinaka manifesto rules */
export const MANIFESTO_RULES = [
  {
    id: 'execution',
    rule: 'Execution over ideas',
    detail: 'An average idea executed brilliantly beats a brilliant idea executed averagely.',
  },
  {
    id: 'problem',
    rule: 'Start from the problem',
    detail: 'Every product begins with a real, observed problem — not a feature wish list.',
  },
  {
    id: 'simplicity',
    rule: 'Simplest architecture that works',
    detail: 'We do not add complexity until the simplest solution has been genuinely exhausted.',
  },
  {
    id: 'traction',
    rule: 'Never fake traction',
    detail: 'Vanity metrics are noise. We measure real usage, real retention, real revenue.',
  },
];
