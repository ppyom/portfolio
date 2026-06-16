import { getServerSession } from 'next-auth';

import authOptions from '@/lib/auth-options';
import Logo from '@/components/common/logo';
import { ThemeToggle } from '@/components/common/theme/theme-toggle';

import { HeaderNavigation } from './header-navigation';
import { HeaderWrapper } from './header-wrapper';
import { MobileHeaderMenu } from './mobile-header-menu';
import { UserMenu } from './user-menu';

export async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <HeaderWrapper>
      <div className="max-w-4xl mx-auto p-4 flex gap-2 justify-between">
        <Logo />
        <div className="hidden flex-1 sm:flex gap-2">
          <nav className="flex-1 flex items-center justify-center gap-6 text-sm font-medium">
            <HeaderNavigation />
          </nav>
          <ThemeToggle />
          <UserMenu session={session} />
        </div>
        <div className="block sm:hidden">
          <MobileHeaderMenu session={session} />
        </div>
      </div>
    </HeaderWrapper>
  );
}
