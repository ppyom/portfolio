import { cloneElement, isValidElement } from 'react';
import { useDropdown } from './dropdown-context';

interface Props {
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLElement>>;
}

export function DropdownTrigger({ children }: Props) {
  const { open, setOpen } = useDropdown();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: () => setOpen(!open),
  });
}
