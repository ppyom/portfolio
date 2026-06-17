import { cloneElement, isValidElement } from 'react';

import { useModal } from './modal-context';

interface Props {
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLElement>>;
}

export function ModalTrigger({ children }: Props) {
  const { setOpen } = useModal();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onClick: (event) => {
      children.props.onClick?.(event);
      setOpen(true);
    },
  });
}
