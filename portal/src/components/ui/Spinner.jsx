import clsx from 'clsx';

/**
 * Loading spinner component.
 * @param {Object} props
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {string} [props.className]
 */
export default function Spinner({ size = 'md', className }) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  };

  return (
    <span
      role="status"
      aria-label="Loading"
      className={clsx(
        'inline-block animate-spin rounded-full border-pinaka-border border-t-pinaka-accent',
        sizeClasses[size],
        className
      )}
    />
  );
}
