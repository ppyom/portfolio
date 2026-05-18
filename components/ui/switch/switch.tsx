import { cn } from '@/lib/utils';

interface Props extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {}

export function Switch({ className, ...props }: Props) {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span
        className={cn(
          'flex items-center h-6 w-9 px-0.5 rounded-full border border-border bg-border-strong transition-all',
          'peer-checked:border-brand-primary peer-checked:bg-brand-primary',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary/50',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          'peer-aria-invalid:border-semantic-error peer-aria-invalid:ring-2 peer-aria-invalid:ring-semantic-error/30',
          'group-data-invalid:border-semantic-error group-data-invalid:ring-2 group-data-invalid:ring-semantic-error/30',
          '[&>span]:translate-x-0 peer-checked:[&>span]:translate-x-3.5',
          className,
        )}
      >
        <span className="size-4 rounded-full bg-white transition-transform shadow-sm" />
      </span>
    </label>
  );
}
