'use client';

import { cn } from '@/lib/utils';

import { useAdminLayout } from './admin-layout-context';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function AdminSidebar({ children, className }: Props) {
  const { isCollapsed } = useAdminLayout();

  return (
    <aside
      className={cn(
        'sticky top-0 h-screen shrink-0 border-r bg-surface-primary transition-all duration-200',
        isCollapsed ? 'w-16' : 'w-64',
        className,
      )}
    >
      {children}
    </aside>
  );
}
