'use client';

import Link from 'next/link';
import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { LayoutDashboardIcon, LogOutIcon } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  DropdownTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  session: Session | null;
}

export function UserMenu({ session }: Props) {
  const t = useTranslations('UserMenu');
  const isMobile = useIsMobile();

  const handleLogout = () => {
    signOut();
  };

  if (!session?.user) {
    return (
      <Link href="/login">
        <Button size="sm">{t('login')}</Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownTrigger>
        <Button variant="ghost" className="px-2">
          <Avatar size="sm" fallback={session.user.name} />
        </Button>
      </DropdownTrigger>
      <DropdownContent side="bottom" align={isMobile ? 'start' : 'end'}>
        <DropdownItem>
          <Link className="flex items-center gap-2" href="/manage">
            <LayoutDashboardIcon size={14} />
            {t('manage')}
          </Link>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem onClick={handleLogout}>
          <LogOutIcon size={14} />
          {t('logout')}
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}
