/** Valid track values */
export const TRACKS = ['flagship', 'incubating', 'breakthroughs', 'proposals'];

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

/** Human-readable track labels */
export const TRACK_LABELS = {
  flagship: 'Featured',
  incubating: 'Ongoing Work',
  breakthroughs: 'Breakthroughs',
  research: 'Breakthroughs', // alias for backwards compatibility
  proposals: 'Proposals',
  community: 'Community',
};

/** Category descriptions for one-liner display under tabs */
export const TRACK_DESCRIPTIONS = {
  '': 'Complete ecosystem directory of curated ideas, prototypes, and launched systems.',
  flagship: 'Deployed, tested, and actively operating production systems with verified users.',
  incubating: 'Active projects with working prototypes, running builds, or functional MVPs.',
  breakthroughs: 'Advanced AI architectures, multi-agent simulations, and deep scientific research.',
  proposals: 'Early problem briefs, architectural proposals, and suggested initiatives seeking collaborators.',
};

/** Human-readable status labels */
export const STATUS_LABELS = {
  concept: 'Proposed Idea',
  prototype: 'Working Prototype',
  mvp: 'Active MVP',
  pilot: 'Pilot Stage',
  live: 'Launched & Live',
  paused: 'Paused',
  archived: 'Archived',
};

/** Curated domain categories */
export const POPULAR_CATEGORIES = [
  'Campus Tech',
  'EdTech',
  'AI / ML',
  'Infrastructure',
  'Dev Tools',
  'Civic Tech',
  'HealthTech',
  'FinTech',
  'Defense Tech / Urban AI',
  'Cybersecurity',
  'Web3 / Open Data',
  'Other',
];

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
  breakthroughs: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    border: 'border-blue-200',
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
  proposals: {
    bg: 'bg-amber-50',
    text: 'text-amber-900',
    border: 'border-amber-200',
  },
  community: {
    bg: 'bg-stone-50',
    text: 'text-stone-800',
    border: 'border-stone-300',
  },
};

/**
 * The Brand & Operating Principles.
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
