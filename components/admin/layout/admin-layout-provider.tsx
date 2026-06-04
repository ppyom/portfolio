'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useIsMobile } from '@/hooks/use-mobile';

import AdminLayoutContext from './admin-layout-context';

interface Props {
  children: React.ReactNode;
}

export function AdminLayoutProvider({ children }: Props) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setIsSidebarOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      (() => setIsSidebarOpen(false))();
    }
  }, [isMobile, pathname]);

  return (
    <AdminLayoutContext.Provider
      value={useMemo(
        () => ({
          isCollapsed,
          isSidebarOpen,
          setIsCollapsed,
          setIsSidebarOpen,
          toggleSidebar,
        }),
        [isCollapsed, isSidebarOpen, toggleSidebar],
      )}
    >
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      {children}
    </AdminLayoutContext.Provider>
  );
}
