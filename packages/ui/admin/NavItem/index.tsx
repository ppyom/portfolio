import React, { type ComponentProps } from 'react';
import { cn } from '../../utils';
import { Icon } from '../../icon';
import { Typography } from '../../atoms';
import Link from 'next/link';

interface Props {
  icon: ComponentProps<typeof Icon>['type'];
  title: string;
  pathname: string;
  isActive?: boolean;
}

export const NavItem = ({ icon, title, pathname, isActive }: Props) => {
  return (
    <Link
      href={pathname}
      className={cn(
        'flex items-center gap-4',
        'px-4 py-2',
        'cursor-pointer',
        'duration-200',
        isActive ? 'bg-brand-secondary' : 'hover:bg-brand-secondary/50',
      )}
    >
      <Icon
        type={icon}
        className={cn(
          'text-2xl',
          isActive ? 'text-neutral-200' : 'text-neutral-600',
        )}
      />
      <Typography
        type="title"
        className={cn(isActive ? 'text-neutral-50' : 'text-neutral-500')}
      >
        {title}
      </Typography>
    </Link>
  );
};
