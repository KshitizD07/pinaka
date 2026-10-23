import clsx from 'clsx';
import { TRACK_LABELS, STATUS_LABELS, STATUS_COLORS } from '@/lib/constants';

const TRACK_STYLES = {
  flagship: 'bg-pinaka-accent/10 text-pinaka-accent border-pinaka-accent/30',
  research: 'bg-pinaka-gold/10 text-pinaka-gold border-pinaka-gold/30',
  incubating: 'bg-pinaka-jade/10 text-pinaka-jade border-pinaka-jade/30',
  community: 'bg-pinaka-ink-faint/20 text-pinaka-ink-muted border-pinaka-ink-faint/40',
};

/**
 * Badge component for track and status labels.
 * @param {Object} props
 * @param {'track'|'status'} props.variant
 * @param {string} props.value - track or status value key
 * @param {string} [props.className]
 */
export default function Badge({ variant, value, className }) {
  let label = value;
  let styles = '';

  if (variant === 'track') {
    label = TRACK_LABELS[value] ?? value;
    styles = TRACK_STYLES[value] ?? 'bg-pinaka-ink-faint/20 text-pinaka-ink-muted';
  } else if (variant === 'status') {
    label = STATUS_LABELS[value] ?? value;
    const colors = STATUS_COLORS[value] ?? {};
    styles = clsx(colors.bg, colors.text, colors.border);
  }

  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        styles,
        className
      )}
    >
      {label}
    </span>
  );
}
