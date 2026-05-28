import { createContext, useContext } from 'react';

interface DialogContextValue {
  id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error('Dialog components must be used inside Dialog');
  }

  return context;
}

export default DialogContext;
