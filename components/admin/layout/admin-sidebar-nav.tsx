'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarItems } from '@/lib/constants/admin-sidebar-items';
import { cn } from '@/lib/utils';

import { useAdminLayout } from './admin-layout-context';

export function AdminSidebarNav() {
  const pathname = usePathname();
  const { isCollapsed } = useAdminLayout();

  return (
    <nav className="flex-1 flex flex-col gap-1 p-2">
      {sidebarItems.map((item) => {
        const active =
          item.href === '/manage'
            ? pathname === item.href
            : pathname.startsWith(item.href);

        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex h-10 items-center gap-3 rounded-md px-3 text-sm transition-colors',
              'hover:bg-surface-secondary hover:text-text-primary',
              active && 'bg-surface-secondary text-text-primary font-medium',
              isCollapsed && 'justify-center px-0',
            )}
          >
            <Icon className="shrink-0" size={18} />

            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
