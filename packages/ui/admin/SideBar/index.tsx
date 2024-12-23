import { NavBar } from '../NavBar';
import type { ComponentProps } from 'react';
import { Logo } from '../Logo';
import { cn } from '../../utils';
import Link from 'next/link';

interface Props {
  menus: ComponentProps<typeof NavBar>['menus'];
}

export const SideBar = ({ menus }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        'py-4 bg-neutral-100',
        'max-w-80 h-full',
      )}
    >
      <div className={cn('p-4', 'flex justify-between items-center')}>
        <Link href="/">
          <Logo className="duration-200 hover:brightness-90" />
        </Link>
      </div>
      <NavBar className="flex-1" menus={menus} />
    </div>
  );
};
