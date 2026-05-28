import { useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import { useDropdown } from './dropdown-context';

interface Props
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contentVariants> {}

const contentVariants = cva(
  'absolute z-50 min-w-48 rounded-md border bg-background p-1 shadow-lg',
  {
    variants: {
      side: {
        top: 'bottom-full mb-2 left-0',
        bottom: 'top-full mt-2 left-0',
        left: 'right-full mr-2 top-0',
        right: 'left-full ml-2 top-0',
      },
    },
    defaultVariants: {
      side: 'bottom',
    },
  },
);

export function DropdownContent({ className, children, side }: Props) {
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
      <div role="menu" className={cn(contentVariants({ side }), className)}>
        {children}
      </div>
    </>
  );
}
