import React from 'react';
import type { ChildrenProps } from '@packages/types/components';
import { cn } from '../../utils';

type ButtonProps = Pick<React.ComponentPropsWithoutRef<'button'>, 'onClick'>;

interface Props extends ChildrenProps, ButtonProps {
  className: string;
}

export const Button = ({ children, onClick, className }: Props) => {
  return (
    <button
      className={cn(
        'px-4',
        'py-2',
        'text-sm',
        'rounded-lg',
        'bg-neutral-300 hover:brightness-90',
        'duration-200',
        'cursor-pointer',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
