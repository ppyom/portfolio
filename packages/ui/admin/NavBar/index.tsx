import React from 'react';
import type { Menu } from '@packages/types/components';
import { NavItem } from '../NavItem';
import { usePathname } from 'next/navigation';
import { cn } from '../../utils';

interface Props {
  menus: Menu[];
  className?: string;
}

export const NavBar = ({ menus, className }: Props) => {
  const pathname = usePathname();
  return (
    <nav className={cn(className)}>
      {menus.map((menu) => (
        <NavItem
          key={`navbar_${menu.pathname}`}
          {...menu}
          isActive={pathname === menu.pathname}
        />
      ))}
    </nav>
  );
};
