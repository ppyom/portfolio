import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

interface Props
  extends
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const textareaVariants = cva(
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
        sm: 'min-h-20 px-3 py-2 text-sm',
        md: 'min-h-36 px-4 py-3 text-sm',
        lg: 'min-h-44 px-4 py-4 text-base',
      },
      resizable: {
        false: 'resize-none',
        true: 'resize-y',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      resizable: false,
    },
  },
);

export function Textarea({
  variant,
  size,
  resizable,
  className,
  ...props
}: Props) {
  return (
    <textarea
      className={cn(textareaVariants({ variant, size, resizable }), className)}
      aria-invalid={variant === 'error'}
      {...props}
    />
  );
}
