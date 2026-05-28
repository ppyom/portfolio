import { cn } from '@/lib/utils';

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export function Radio({ className, ...props }: Props) {
  return (
    <label className="inline-flex items-center">
      <input type="radio" className="peer sr-only" {...props} />
      <span
        className={cn(
          'flex size-4 items-center justify-center rounded-full border border-border bg-surface-elevated transition-all',
          'peer-checked:border-brand-primary peer-checked:bg-brand-primary',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary/50',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          'peer-aria-invalid:border-semantic-error peer-aria-invalid:ring-2 peer-aria-invalid:ring-semantic-error/30',
          'group-data-invalid:border-semantic-error group-data-invalid:ring-2 group-data-invalid:ring-semantic-error/30',
          '[&>span]:scale-0 peer-checked:[&>span]:scale-100',
          className,
        )}
      >
        <span className="inline-block size-2 rounded-full bg-white transition-transform" />
      </span>
    </label>
  );
}
