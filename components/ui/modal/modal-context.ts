'use client';

import { createContext, useContext } from 'react';

interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal must be used within Modal');
  }
  return context;
};

export default ModalContext;
