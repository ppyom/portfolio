import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import authOptions from '@/lib/auth-options';
import { config } from '@/lib/config';
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
import { RootDocument } from '@/components/provider/root-document';
import { ThemeToggle } from '@/components/theme/theme-toggle';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
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

// 관리자의 루트 레이아웃. 한국어 전용이라 lang을 고정한다
export default async function Layout({ children }: Props) {
  const session = await getServerSession(authOptions);

  return (
    <RootDocument lang="ko">
      <AdminLayout>
        <AdminSidebar>
          <AdminSidebarNav />
          <div className="flex gap-1 items-center p-1">
            <AdminUserMenu session={session} />
            <ThemeToggle side="top" />
          </div>
        </AdminSidebar>
        <AdminMain>
          <AdminHeader>
            <AdminSidebarTrigger />
            <AdminBreadcrumb />
          </AdminHeader>
          {children}
        </AdminMain>
      </AdminLayout>
    </RootDocument>
  );
}
