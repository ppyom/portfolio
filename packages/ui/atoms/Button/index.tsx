import React from 'react';
import type { ChildrenProps } from 'types/components';

type ButtonProps = Pick<React.ComponentPropsWithoutRef<'button'>, 'onClick'>;

interface Props extends ChildrenProps, ButtonProps {
  //
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button className="bg-neutral-300 px-4 py-2 rounded-lg" onClick={onClick}>
      {children}
    </button>
  );
};
