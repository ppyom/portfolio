import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ className, children, ...props }: Props) {
  return (
    <div className="relative inline-block min-w-48">
      <select
        className={cn(
          'peer h-10 w-full rounded-md border border-border bg-surface-elevated px-3 pr-10 text-sm text-text-primary outline-none transition-all',
          'appearance-none [-webkit-appearance:none] [-moz-appearance:none]',
          'focus-visible:ring-2 focus-visible:ring-brand-primary/50',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'aria-invalid:border-semantic-error aria-invalid:ring-2 aria-invalid:ring-semantic-error/30',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDownIcon
        className={cn(
          'pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-text-muted transition-colors',
          'peer-focus-visible:text-text-primary',
        )}
      />
    </div>
  );
}
