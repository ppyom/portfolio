import type { ChildrenProps } from '@packages/types/components';
import { Header, SideBar } from '@packages/ui/admin';
import { cn } from '@packages/ui/utils';
import { LoginGuard } from '@components/guard/LoginGuard';
import { LogoutButton } from '@components/feature/LogoutButton';

const MainLayout = ({ children }: ChildrenProps) => {
  return (
    <LoginGuard>
      <div className={cn('w-full min-h-screen', 'flex')}>
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
        <div className={cn('flex-1')}>
          <Header menus={[]} name={'이예진'} image={null} />
          {children}
        </div>
        <LogoutButton />
      </div>
    </LoginGuard>
  );
};

export default MainLayout;
