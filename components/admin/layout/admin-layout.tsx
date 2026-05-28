import { AdminLayoutProvider } from './admin-layout-provider';

interface Props {
  children: React.ReactNode;
}

export function AdminLayout({ children }: Props) {
  return (
    <AdminLayoutProvider>
      <div className="flex min-h-screen bg-surface-primary">{children}</div>
    </AdminLayoutProvider>
  );
}
