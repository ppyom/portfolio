'use client';

import { createContext, useContext } from 'react';

interface SheetContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextValue | null>(null);

export function useSheet() {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('Sheet components must be used within Sheet');
  }
  return context;
}

export default SheetContext;
