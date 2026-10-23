import clsx from 'clsx';

const VARIANTS = {
  primary:
    'bg-pinaka-accent text-white hover:bg-pinaka-accent-dim active:bg-pinaka-accent-dim focus-visible:ring-pinaka-accent',
  ghost:
    'bg-transparent text-pinaka-ink-muted hover:text-pinaka-ink hover:bg-pinaka-panel focus-visible:ring-pinaka-border',
  outline:
    'bg-transparent border border-pinaka-border text-pinaka-ink hover:border-pinaka-accent hover:text-pinaka-accent focus-visible:ring-pinaka-accent',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

/**
 * Button component.
 * @param {Object} props
 * @param {'primary'|'ghost'|'outline'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {boolean} [props.disabled]
 * @param {string} [props.className]
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ...rest
}) {
  return (
    <button
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-pinaka-void',
        'disabled:cursor-not-allowed disabled:opacity-40',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
