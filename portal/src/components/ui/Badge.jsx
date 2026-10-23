import clsx from 'clsx';
import { TRACK_LABELS, STATUS_LABELS, STATUS_COLORS, TRACK_COLORS } from '@/lib/constants';

/**
 * Editorial Badge component with precision borders and clean typography.
 * @param {Object} props
 * @param {'track'|'status'} props.variant
 * @param {string} props.value - track or status value key
 * @param {string} [props.className]
 */
export default function Badge({ variant, value, className }) {
  if (variant === 'track') {
    const label = TRACK_LABELS[value] ?? value;
    const colors = TRACK_COLORS[value] ?? {
      bg: 'bg-pinaka-ice',
      text: 'text-pinaka-slate',
      border: 'border-pinaka-hairline',
    };

    return (
      <span
        className={clsx(
          'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase border rounded-sm font-sans',
          colors.bg,
          colors.text,
          colors.border,
          className
        )}
      >
        {label}
      </span>
    );
  }

  const label = STATUS_LABELS[value] ?? value;
  const colors = STATUS_COLORS[value] ?? {
    bg: 'bg-pinaka-ice',
    text: 'text-pinaka-slate',
    border: 'border-pinaka-hairline',
    dot: 'bg-pinaka-ash',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wide border rounded-sm font-sans',
        colors.bg,
        colors.text,
        colors.border,
        className
      )}
    >
      <span className={clsx('h-1.5 w-1.5 rounded-full', colors.dot)} aria-hidden="true" />
      {label}
    </span>
  );
}
