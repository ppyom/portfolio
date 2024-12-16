import React, { type ComponentProps } from 'react';
import { cn } from '../../utils';
import { Icon } from '../../icon';
import { Typography } from '../../atoms';

interface Props {
  icon: ComponentProps<typeof Icon>['type'];
  title: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const NavItem = ({ icon, title, onClick, isActive }: Props) => {
  return (
    <div
      className={cn(
        'flex items-center gap-4',
        'px-4 py-2',
        'cursor-pointer',
        'duration-200',
        !isActive && 'hover:bg-brand-secondary/50',
        isActive && 'bg-brand-secondary',
      )}
      onClick={onClick}
    >
      <Icon
        type={icon}
        className={cn(
          'text-2xl text-neutral-600',
          isActive && 'text-neutral-200',
        )}
      />
      <Typography
        type="title"
        className={cn('text-neutral-500', isActive && 'text-neutral-50')}
      >
        {title}
      </Typography>
    </div>
  );
};
