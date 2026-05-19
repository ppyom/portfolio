import { useEffect, useId, useState } from 'react';
import DialogContext from './dialog-context';

interface Props {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: Props) {
  const id = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    if (currentOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [currentOpen]);

  return (
    <DialogContext.Provider
      value={{
        id,
        open: currentOpen,
        setOpen,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
