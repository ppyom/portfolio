import { cloneElement, isValidElement } from 'react';

import { useSheet } from './sheet-context';

interface Props {
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLElement>>;
}

export function SheetClose({ children }: Props) {
  const { setOpen } = useSheet();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: () => setOpen(false),
  });
}
