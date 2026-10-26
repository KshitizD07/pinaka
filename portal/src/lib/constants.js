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
  flagship: 'Featured Initiative',
  research: 'Research & Concepts',
  incubating: 'Active Projects',
  community: 'Community Showcase',
};

/** Human-readable status labels reflecting §3.1 and §1.6 */
export const STATUS_LABELS = {
  concept: 'Concept Stage',
  prototype: 'Working Prototype',
  mvp: 'Active Build / MVP',
  pilot: 'Pilot Evaluation',
  live: 'Launched Product',
  paused: 'Paused',
  archived: 'Archived',
};

/**
 * Editorial status styles with refined saffron, jade, stone, and gold tokens.
 */
export const STATUS_COLORS = {
  concept: {
    bg: 'bg-pinaka-ice',
    text: 'text-pinaka-slate',
    border: 'border-pinaka-hairline',
    dot: 'bg-pinaka-ash',
  },
  prototype: {
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  mvp: {
    bg: 'bg-pinaka-saffron-wash',
    text: 'text-pinaka-saffron-deep',
    border: 'border-pinaka-saffron/30',
    dot: 'bg-pinaka-saffron',
  },
  pilot: {
    bg: 'bg-teal-50',
    text: 'text-teal-900',
    border: 'border-teal-200',
    dot: 'bg-teal-600',
  },
  live: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-900',
    border: 'border-emerald-300',
    dot: 'bg-emerald-600',
  },
  paused: {
    bg: 'bg-stone-100',
    text: 'text-stone-700',
    border: 'border-stone-300',
    dot: 'bg-stone-500',
  },
  archived: {
    bg: 'bg-slate-100',
    text: 'text-slate-500',
    border: 'border-slate-200',
    dot: 'bg-slate-400',
  },
};

/**
 * Track badge colors
 */
export const TRACK_COLORS = {
  flagship: {
    bg: 'bg-pinaka-saffron-wash',
    text: 'text-pinaka-saffron-deep',
    border: 'border-pinaka-saffron/40',
  },
  research: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    border: 'border-blue-200',
  },
  incubating: {
    bg: 'bg-purple-50',
    text: 'text-purple-900',
    border: 'border-purple-200',
  },
  community: {
    bg: 'bg-stone-50',
    text: 'text-stone-800',
    border: 'border-stone-300',
  },
};

/**
 * The Brand & Operating Principles from Section 1.6 of the Strategy Document.
 */
export const MANIFESTO_RULES = [
  {
    num: 'I',
    code: '01',
    rule: 'Curiosity & Creator Respect',
    description:
      'We make room for thoughtful, unconventional, and technically ambitious work while recognizing the independent creators behind each idea.',
  },
  {
    num: 'II',
    code: '02',
    rule: 'Earned Curation & Review',
    description:
      'Publication is earned through manual review, not automatic submission. We prioritize problem significance and creator readiness.',
  },
  {
    num: 'III',
    code: '03',
    rule: 'Clarity Over Vanity Hype',
    description:
      'We distinguish concepts, prototypes, active builds, and launched products. Never present a prototype as a business or a feature as an endorsement.',
  },
  {
    num: 'IV',
    code: '04',
    rule: 'Sovereign Trust & IP Retention',
    description:
      'Submitting work never transfers ownership to Pinaka. Creators retain complete IP and recognition unless separate, explicit agreements are made.',
  },
];
