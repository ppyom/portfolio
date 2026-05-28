import { useState } from 'react';

import { cn } from '@/lib/utils';

import DropdownContext from './dropdown-context';

interface Props {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function DropdownMenu({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  className,
}: Props) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const currentOpen = open ?? internalOpen;

  const setOpen = (next: boolean) => {
    if (open === undefined) {
      setInternalOpen(next);
    }

    onOpenChange?.(next);
  };

  return (
    <DropdownContext.Provider
      value={{
        open: currentOpen,
        setOpen,
      }}
    >
      <div className={cn('relative w-fit', className)}>{children}</div>
    </DropdownContext.Provider>
  );
}
