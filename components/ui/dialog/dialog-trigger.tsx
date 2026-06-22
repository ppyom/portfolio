import { cloneElement, isValidElement } from 'react';

import { useDialog } from './dialog-context';

interface Props {
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
}

export function DialogTrigger({ children }: Props) {
  const { setOpen } = useDialog();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: (event) => {
      children.props.onClick?.(event);
      setOpen(true);
    },
  });
}
