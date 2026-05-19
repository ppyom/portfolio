import { cloneElement } from 'react';
import { useDialog } from './dialog-context';

interface Props {
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
}

export function DialogClose({ children }: Props) {
  const { setOpen } = useDialog();

  return cloneElement(children, {
    onClick: (event) => {
      children.props.onClick?.(event);
      setOpen(false);
    },
  });
}
