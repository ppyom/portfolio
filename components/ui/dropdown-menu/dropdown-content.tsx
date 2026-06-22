import { useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { useDropdown } from './dropdown-context';

interface Props
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentVariants> {}

const contentVariants = cva(
  'absolute z-50 min-w-48 rounded-md border bg-surface-primary p-1 shadow-lg',
  {
    variants: {
      side: {
        top: 'bottom-full mb-2',
        bottom: 'top-full mt-2',
        left: 'right-full mr-2',
        right: 'left-full ml-2',
      },
      align: {
        start: '',
        center: '',
        end: '',
      },
    },
    compoundVariants: [
      { side: 'bottom', align: 'start', class: 'left-0' },
      { side: 'bottom', align: 'center', class: 'left-1/2 -translate-x-1/2' },
      { side: 'bottom', align: 'end', class: 'right-0' },
      { side: 'top', align: 'start', class: 'left-0' },
      { side: 'top', align: 'center', class: 'left-1/2 -translate-x-1/2' },
      { side: 'top', align: 'end', class: 'right-0' },
      { side: 'left', align: 'start', class: 'top-0' },
      { side: 'left', align: 'center', class: 'top-1/2 -translate-y-1/2' },
      { side: 'left', align: 'end', class: 'bottom-0' },
      { side: 'right', align: 'start', class: 'top-0' },
      { side: 'right', align: 'center', class: 'top-1/2 -translate-y-1/2' },
      { side: 'right', align: 'end', class: 'bottom-0' },
    ],
    defaultVariants: {
      side: 'bottom',
      align: 'start',
    },
  },
);

export function DropdownContent({ className, children, side, align }: Props) {
  const { open, setOpen } = useDropdown();

  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [setOpen]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      <div
        role="menu"
        className={cn(contentVariants({ side, align }), className)}
      >
        {children}
      </div>
    </>
  );
}
