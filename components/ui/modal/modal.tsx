import { useCallback, useEffect, useId, useState } from 'react';

import {
  isTopModal,
  pushModal,
  removeModal,
} from '@/components/ui/modal/modal-manager';

import ModalContext from './modal-context';

interface Props {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Modal({
  children,
  open,
  defaultOpen = false,
  onOpenChange,
}: Props) {
  const id = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = open !== undefined;
  const currentOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInternalOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  useEffect(() => {
    if (!currentOpen) return;

    pushModal(id);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      if (!isTopModal(id)) return;

      e.preventDefault();
      setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      removeModal(id);
    };
  }, [id, currentOpen, setOpen]);

  return (
    <ModalContext.Provider
      value={{
        open: currentOpen,
        setOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
