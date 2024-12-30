import React from 'react';
import type { ChildrenProps } from '@packages/types/components';
import { cn } from '../../utils';

type ButtonProps = Pick<React.ComponentPropsWithoutRef<'button'>, 'onClick'>;

interface Props extends ChildrenProps, ButtonProps {
  className?: string;
  bg?:
    | 'primary'
    | 'secondary'
    // className으로 색상을 지정할 때 사용
    | 'auto';
}

export const Button = ({
  children,
  onClick,
  className,
  bg = 'primary',
}: Props) => {
  return (
    <button
      className={cn(
        'px-4',
        'py-2',
        'text-sm',
        'rounded-lg',
        bg === 'primary'
          ? 'bg-brand-primary text-base-black'
          : bg === 'secondary'
            ? 'bg-brand-secondary text-base-white'
            : null,
        'hover:brightness-90',
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
