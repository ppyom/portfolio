import React from 'react';
import type { Menu } from '@packages/types/components';
import { NavItem } from '../NavItem';
import { usePathname } from 'next/navigation';

interface Props {
  menus: Menu[];
}

export const NavBar = ({ menus }: Props) => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div>
      {menus.map((menu) => (
        <NavItem
          key={`navbar_${menu.pathname}`}
          {...menu}
          isActive={pathname === menu.pathname}
        />
      ))}
    </div>
  );
};
