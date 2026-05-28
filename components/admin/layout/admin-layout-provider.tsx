'use client';

import { useMemo, useState } from 'react';

import AdminLayoutContext from './admin-layout-context';

interface Props {
  children: React.ReactNode;
}

export function AdminLayoutProvider({ children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <AdminLayoutContext.Provider
      value={useMemo(
        () => ({
          isCollapsed,
          setIsCollapsed,
          toggleSidebar,
        }),
        [isCollapsed],
      )}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
}
