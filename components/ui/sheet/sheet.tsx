import { useState } from 'react';

import SheetContext from './sheet-context';

interface Props {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sheet({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
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
    <SheetContext.Provider
      value={{
        open: currentOpen,
        setOpen,
      }}
    >
      {children}
    </SheetContext.Provider>
  );
}
