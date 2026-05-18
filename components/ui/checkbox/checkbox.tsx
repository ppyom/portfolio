import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type'
> {}

export function Checkbox({ className, ...props }: Props) {
  return (
    <label className="inline-flex items-center">
      <input type="checkbox" className="peer sr-only" {...props} />
      <span
        className={cn(
          'flex size-4 items-center justify-center rounded-sm border border-border bg-surface-elevated transition-all',
          'peer-checked:border-brand-primary peer-checked:bg-brand-primary',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-primary/50',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
          'peer-aria-invalid:border-semantic-error peer-aria-invalid:ring-2 peer-aria-invalid:ring-semantic-error/30',
          '[&>svg]:scale-0 peer-checked:[&>svg]:scale-100',
          className,
        )}
      >
        <CheckIcon className="size-2.5 text-white transition-transform" />
      </span>
    </label>
  );
}
