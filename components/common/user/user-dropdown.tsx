'use client';
import { signOut } from 'next-auth/react';
import type { PopperContentProps } from '@radix-ui/react-popper';
import { LogOutIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  side?: PopperContentProps['side'];
  align?: PopperContentProps['align'];
}

export default function UserDropdown({
  trigger,
  children,
  side = 'bottom',
  align = 'end',
}: Props) {
  const handleLogout = () => {
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={side}
        align={align}
        sideOffset={4}
      >
        {children && (
          <>
            {children}
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
