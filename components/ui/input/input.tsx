import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

interface Props
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {}

const inputVariants = cva(
  'rounded-md border bg-surface-elevated transition-all outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border-border text-text-primary placeholder:text-text-muted focus-visible:border-brand-primary focus-visible:ring-brand-primary/50',
        error:
          'border-semantic-error text-text-primary placeholder:text-text-muted ring-2 ring-semantic-error/10 focus-visible:ring-semantic-error/30',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export function Input({
  type = 'text',
  variant,
  size,
  className,
  ...props
}: Props) {
  return (
    <input
      type={type}
      className={cn(inputVariants({ variant, size }), className)}
      aria-invalid={variant === 'error'}
      {...props}
    />
  );
}
