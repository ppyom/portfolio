import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import authOptions from '@/lib/auth-options';
import {
  AdminBreadcrumb,
  AdminHeader,
  AdminLayout,
  AdminMain,
  AdminSidebar,
  AdminSidebarNav,
  AdminSidebarTrigger,
  AdminUserMenu,
} from '@/components/admin/layout';

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
  const session = await getServerSession(authOptions);

  return (
    <AdminLayout>
      <AdminSidebar>
        <AdminSidebarNav />
        <AdminUserMenu session={session} />
      </AdminSidebar>
      <AdminMain>
        <AdminHeader>
          <AdminSidebarTrigger />
          <AdminBreadcrumb />
        </AdminHeader>
        {children}
      </AdminMain>
    </AdminLayout>
  );
}
