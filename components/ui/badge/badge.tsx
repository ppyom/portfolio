import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-brand-primary text-brand-text-primary',
        secondary: 'bg-brand-secondary text-brand-text-secondary',
        info: 'bg-semantic-info/10 text-semantic-info',
        success: 'bg-semantic-success/10 text-semantic-success',
        warning: 'bg-semantic-warning/10 text-semantic-warning',
        error: 'bg-semantic-error/10 text-semantic-error',
        muted: 'bg-text-muted/10 text-text-muted',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-[0.75rem]',
        md: 'px-2 py-0.5 text-sm',
        lg: 'px-2.5 py-1 text-md',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

interface Props
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: Props) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}
