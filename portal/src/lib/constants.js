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
  flagship: 'Primary Flagship',
  research: 'Applied Research',
  incubating: 'Incubation Track',
  community: 'Community Collective',
};

/** Human-readable status labels */
export const STATUS_LABELS = {
  concept: 'Concept Stage',
  prototype: 'Lab Prototype',
  mvp: 'Functional MVP',
  pilot: 'Active Pilot',
  live: 'Production Live',
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
 * The 4 Pinaka Golden Laws from documentation.
 */
export const MANIFESTO_RULES = [
  {
    num: 'I',
    code: '01',
    rule: 'Execution and Evidence Over Ideas',
    description:
      'Ideas carry zero sovereign weight until backed by working code, real user interaction, and verifiable audit trials.',
  },
  {
    num: 'II',
    code: '02',
    rule: 'Start from the Problem, Not Technology',
    description:
      'We never deploy distributed consensus or neural nets where a plain Postgres table and a single clean index will suffice.',
  },
  {
    num: 'III',
    code: '03',
    rule: 'The Simplest Architecture That Works Wins',
    description:
      'Every line of unnecessary complexity is technical liability. We build modular, resilient systems with crisp boundaries.',
  },
  {
    num: 'IV',
    code: '04',
    rule: 'Never Fake Traction or Misrepresent Maturity',
    description:
      'Never present a prototype as a deployed product, or a deployed product as a business. Total transparency with builders and partners.',
  },
];
