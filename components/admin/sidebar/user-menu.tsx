'use client';

import type { Session } from 'next-auth';
import { MoreVerticalIcon } from 'lucide-react';

import { SidebarMenuButton, useSidebar } from '@/components/ui/sidebar';
import UserAvatar from '@/components/common/user/user-avatar';
import UserDropdown from '@/components/common/user/user-dropdown';

interface Props {
  session: Session | null;
}

export default function UserMenu({ session }: Props) {
  const { isMobile } = useSidebar();

  if (!session || !session.user) {
    return null;
  }

  return (
    <UserDropdown
      side={isMobile ? 'bottom' : 'right'}
      trigger={
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <UserAvatar session={session} />
          <MoreVerticalIcon className="ml-auto size-4" />
        </SidebarMenuButton>
      }
    />
  );
}
