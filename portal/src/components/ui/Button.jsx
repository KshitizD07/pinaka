import clsx from 'clsx';

const VARIANTS = {
  primary:
    'bg-pinaka-saffron text-white hover:bg-pinaka-saffron-deep active:bg-pinaka-saffron-deep border border-transparent shadow-saffron-sm focus-visible:ring-pinaka-saffron',
  secondary:
    'bg-pinaka-stone text-white hover:bg-pinaka-charcoal active:bg-black border border-transparent focus-visible:ring-pinaka-stone',
  outline:
    'bg-pinaka-chalk border border-pinaka-hairline text-pinaka-stone hover:border-pinaka-saffron hover:text-pinaka-saffron active:bg-pinaka-saffron-wash focus-visible:ring-pinaka-saffron',
  ghost:
    'bg-transparent text-pinaka-slate hover:text-pinaka-stone hover:bg-pinaka-ice focus-visible:ring-pinaka-hairline',
};

const SIZES = {
  sm: 'px-3.5 py-1.5 text-xs tracking-wider uppercase',
  md: 'px-5 py-2.5 text-xs font-semibold tracking-wider uppercase',
  lg: 'px-7 py-3.5 text-sm font-semibold tracking-wider uppercase',
};

/**
 * Editorial Button component.
 * @param {Object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary']
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
        'inline-flex items-center justify-center gap-2 rounded-sm font-sans transition-all duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-pinaka-kailash',
        'disabled:cursor-not-allowed disabled:opacity-40 select-none cursor-pointer',
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
