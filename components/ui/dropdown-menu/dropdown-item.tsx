import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { useDropdown } from './dropdown-context';

interface Props
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof itemVariants> {
  preventClose?: boolean;
}

const itemVariants = cva(
  'w-full flex gap-2 items-center rounded-sm px-3 py-2 text-sm transition-colors disabled:opacity-40 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'hover:bg-surface-primary',
        destructive: 'text-semantic-error hover:bg-semantic-error/10',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export function DropdownItem({
  className,
  onClick,
  variant,
  preventClose,
  ...props
}: Props) {
  const { setOpen } = useDropdown();

  return (
    <button
      type="button"
      className={cn(
        itemVariants({
          variant,
        }),
        className,
      )}
      onClick={(e) => {
        onClick?.(e);
        if (!preventClose) {
          setOpen(false);
        }
      }}
      {...props}
    />
  );
}
