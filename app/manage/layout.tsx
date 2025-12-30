import type { Metadata } from 'next';

import { SidebarInset } from '@/components/ui/sidebar';
import AdminHeader from '@/components/admin/admin-header';
import Sidebar from '@/components/admin/sidebar';
import SidebarProvider from '@/components/admin/sidebar/provider';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    default: '포트폴리오 관리자',
    template: '%s | 포트폴리오 관리자 | 이예진 포트폴리오',
  },
  robots: {
    index: false,
    follow: false,
  },
  description: null,
  openGraph: null,
};

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
