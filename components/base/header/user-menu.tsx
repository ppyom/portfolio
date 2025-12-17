'use client';

import Link from 'next/link';
import type { Session } from 'next-auth';
import { LayoutDashboardIcon } from 'lucide-react';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/base/user-avatar';
import UserDropdown from '@/components/base/user-dropdown';

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
