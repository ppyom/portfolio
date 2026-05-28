import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

interface Props
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer focus:outline-none disabled:opacity-50 disabled:pointer-events-none disabled:select-none',
  {
    variants: {
      variant: {
        primary:
          'bg-brand-primary text-brand-text-primary hover:bg-brand-primary/80',
        secondary:
          'bg-brand-secondary text-brand-text-secondary hover:bg-brand-secondary/80',
        ghost: 'bg-transparent text-text-primary hover:bg-surface-inverse/10',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export function Button({
  variant,
  size,
  className,
  children,
  isLoading,
  disabled,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        buttonVariants({ variant, size }),
        isLoading && 'gap-2',
        className,
      )}
      disabled={isLoading || disabled}
      aria-busy={isLoading}
      aria-disabled={isLoading || disabled}
      {...props}
    >
      {isLoading && (
        <span
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current/50 border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
