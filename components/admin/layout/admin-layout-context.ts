import { createContext, useContext } from 'react';

type AdminLayoutContextValue = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminLayoutContext = createContext<AdminLayoutContextValue | null>(null);

export function useAdminLayout() {
  const ctx = useContext(AdminLayoutContext);

  if (!ctx) {
    throw new Error('useAdminLayout must be used within AdminLayoutProvider');
  }

  return ctx;
}

export default AdminLayoutContext;
