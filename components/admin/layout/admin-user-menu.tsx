'use client';

import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import { LogOutIcon, MoreVerticalIcon } from 'lucide-react';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@/components/ui/dropdown-menu';

import { useAdminLayout } from './admin-layout-context';

interface Props {
  session: Session | null;
}

export function AdminUserMenu({ session }: Props) {
  const { isCollapsed } = useAdminLayout();

  const handleLogout = () => {
    signOut();
  };

  if (!session?.user) {
    return null;
  }

  return (
    <DropdownMenu className="w-full p-2">
      <DropdownTrigger>
        <Button
          variant="ghost"
          className="h-12 w-full justify-start gap-3 px-2"
        >
          <Avatar size="sm" fallback={session.user.name} />
          {!isCollapsed && (
            <>
              <div className="flex min-w-0 flex-1 flex-col items-start">
                <span className="truncate text-sm font-medium">
                  {session.user.name}
                </span>

                <span className="truncate text-xs text-text-secondary">
                  {session.user.username}
                </span>
              </div>

              <MoreVerticalIcon
                size={16}
                className="shrink-0 text-text-muted"
              />
            </>
          )}
        </Button>
      </DropdownTrigger>

      <DropdownContent side="top">
        <DropdownItem onClick={handleLogout}>
          <LogOutIcon />
          로그아웃
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}
