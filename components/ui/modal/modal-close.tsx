import { cloneElement } from 'react';

import { useModal } from './modal-context';

interface Props {
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLElement>>;
}

export function ModalClose({ children }: Props) {
  const { setOpen } = useModal();

  return cloneElement(children, {
    onClick: (event) => {
      children.props.onClick?.(event);
      setOpen(false);
    },
  });
}
