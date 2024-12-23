import type { Metadata } from 'next';
import type { ChildrenProps } from '@packages/types/components';
import { Header, SideBar } from '@packages/ui/admin';
import '@packages/ui/styles.css';
import { cn } from '@packages/ui/utils';

export const metadata: Metadata = {
  title: 'PPYOM',
};

const RootLayout = ({ children }: Readonly<ChildrenProps>) => {
  return (
    <html lang="ko">
      <body className={cn('w-full min-h-screen', 'flex')}>
        <SideBar
          className="shrink-0"
          menus={[
            { icon: 'dashboard', title: '대시보드', pathname: '/' },
            { icon: 'notice', title: '공지사항', pathname: '/notice' },
            { icon: 'my', title: '내 정보', pathname: '/my' },
            { icon: 'skills', title: '기술스택', pathname: '/skills' },
            { icon: 'projects', title: '프로젝트', pathname: '/projects' },
          ]}
        />
        <main className={cn('flex-1')}>
          <Header menus={[]} name={'이예진'} image={null} />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
