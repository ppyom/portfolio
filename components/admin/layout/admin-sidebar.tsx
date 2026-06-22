'use client';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

import { useAdminLayout } from './admin-layout-context';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function AdminSidebar({ children, className }: Props) {
  const { isCollapsed, isSidebarOpen } = useAdminLayout();

  const isMobile = useIsMobile();

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-surface-primary transition-all duration-200',

        !isMobile && [
          'sticky top-0 h-screen shrink-0',
          isCollapsed ? 'w-16' : 'w-64',
        ],

        isMobile && [
          'fixed inset-y-0 left-0 z-50 h-screen w-64',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        ],

        className,
      )}
    >
      {children}
    </aside>
  );
}
