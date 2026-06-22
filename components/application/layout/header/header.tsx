import type { Session } from 'next-auth';

import { ThemeToggle } from '@/components/theme/theme-toggle';

import { HeaderNavigation } from './header-navigation';
import { HeaderWrapper } from './header-wrapper';
import { Logo } from './logo';
import { MobileHeaderMenu } from './mobile-header-menu';
import { UserMenu } from './user-menu';

interface Props {
  session: Session | null;
}

export function Header({ session }: Props) {
  return (
    <HeaderWrapper>
      <div className="max-w-4xl mx-auto p-4 flex items-center gap-2 justify-between">
        <Logo />
        <div className="hidden flex-1 sm:flex items-center gap-2">
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
