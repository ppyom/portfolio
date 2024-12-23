import { NavBar } from '../NavBar';
import type { ComponentProps } from 'react';
import { Logo } from '../Logo';
import { cn } from '../../utils';
import Link from 'next/link';

interface Props {
  menus: ComponentProps<typeof NavBar>['menus'];
  className?: string;
}

export const SideBar = ({ menus, className }: Props) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        'py-4 bg-neutral-100',
        'max-w-80 w-full h-screen',
        'sticky top-0 z-50',
        className,
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
