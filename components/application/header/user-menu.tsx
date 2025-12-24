'use client';

import Link from 'next/link';
import type { Session } from 'next-auth';
import { LayoutDashboardIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import UserAvatar from '@/components/common/user/user-avatar';
import UserDropdown from '@/components/common/user/user-dropdown';

interface Props {
  session: Session | null;
}

export default function UserMenu({ session }: Props) {
  if (!session) {
    return (
      <Button size="sm" asChild>
        <Link href="/login">로그인</Link>
      </Button>
    );
  }

  return (
    <UserDropdown
      align="start"
      trigger={
        <button
          className="flex gap-2 outline-none cursor-pointer"
          title="사용자 메뉴 열기"
        >
          <UserAvatar session={session} hideUsername />
        </button>
      }
    >
      {session.user.admin && (
        <DropdownMenuItem asChild>
          <Link href="/manage">
            <LayoutDashboardIcon />
            포트폴리오 관리자
          </Link>
        </DropdownMenuItem>
      )}
    </UserDropdown>
  );
}
