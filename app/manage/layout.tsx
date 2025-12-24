import { SidebarInset } from '@/components/ui/sidebar';

import AdminHeader from '@/components/admin/admin-header';
import Sidebar from '@/components/admin/sidebar';
import SidebarProvider from '@/components/admin/sidebar/provider';

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="container mx-auto px-4 py-8 space-y-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
