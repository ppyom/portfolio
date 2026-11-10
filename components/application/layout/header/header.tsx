import type { Session } from 'next-auth';

import { ResumeDownloadButton } from '@/components/application/resume/resume-download-button';
import { ThemeToggle } from '@/components/theme/theme-toggle';

import { HeaderNavigation } from './header-navigation';
import { HeaderWrapper } from './header-wrapper';
import { Logo } from './logo';
import { MobileHeaderMenu } from './mobile-header-menu';
import { UserMenu } from './user-menu';

interface Props {
  session: Session | null;
  resumeUrl?: string | null;
}

export function Header({ session, resumeUrl }: Props) {
  return (
    <HeaderWrapper>
      <div className="max-w-4xl mx-auto p-4 flex items-center gap-2 justify-between">
        <Logo />
        <div className="hidden flex-1 sm:flex items-center gap-2">
          <nav className="flex-1 flex items-center justify-center gap-6 text-sm font-medium">
            <HeaderNavigation />
          </nav>
          <ResumeDownloadButton url={resumeUrl} variant="ghost" size="sm">
            이력서
          </ResumeDownloadButton>
          <ThemeToggle />
          <UserMenu session={session} />
        </div>
        <div className="block sm:hidden">
          <MobileHeaderMenu session={session} resumeUrl={resumeUrl} />
        </div>
      </div>
    </HeaderWrapper>
  );
}
