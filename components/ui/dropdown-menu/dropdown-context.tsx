import { createContext, useContext } from 'react';

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error('Dropdown components must be used within DropdownMenu');
  }

  return context;
}

export default DropdownContext;
