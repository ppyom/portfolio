import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { SheetPortal } from '@/components/ui/sheet/sheet-portal';

import { useSheet } from './sheet-context';

interface Props
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sheetVariants> {}

const sheetVariants = cva(
  [
    'fixed z-50 bg-background shadow-lg',
    'transition-transform animate-in duration-200',
  ],
  {
    variants: {
      side: {
        top: 'top-0 left-0 right-0 slide-in-from-top',
        bottom: 'bottom-0 left-0 right-0 slide-in-from-bottom',
        left: 'left-0 top-0 h-full w-80 slide-in-from-left',
        right: 'right-0 top-0 h-full w-80 slide-in-from-right',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

export function SheetContent({ children, className, side }: Props) {
  const { open, setOpen } = useSheet();

  if (!open) return null;

  return (
    <SheetPortal>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => setOpen(false)}
      />
      <div className={cn(sheetVariants({ side }), className)}>{children}</div>
    </SheetPortal>
  );
}
