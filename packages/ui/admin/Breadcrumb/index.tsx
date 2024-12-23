import React from 'react';
import type { Menu } from '@packages/types/components';
import { Typography } from '../../atoms';
import { Icon } from '../../icon';
import { cn } from '../../utils';

interface Props {
  menus: Menu[];
}

export const Breadcrumb = ({ menus }: Props) => {
  return (
    <div className={cn('flex items-center gap-1', 'text-neutral-500')}>
      {menus.map((menu, idx) => (
        <React.Fragment key={`${menu}_${idx}`}>
          <Typography
            type={idx + 1 !== menus.length ? 'description' : 'description_bold'}
            className="last:text-brand-secondary"
          >
            {menu.title}
          </Typography>
          {idx + 1 !== menus.length && (
            <Icon className="text-xs" type="right" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
