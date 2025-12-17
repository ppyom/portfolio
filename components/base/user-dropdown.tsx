'use client';
import { signOut } from 'next-auth/react';
import { LogOutIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { PopperContentProps } from '@radix-ui/react-popper';

interface Props {
  trigger: React.ReactNode;
  children?: React.ReactNode;
  side?: PopperContentProps['side'];
}

export default function UserDropdown({
  trigger,
  children,
  side = 'bottom',
}: Props) {
  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={side}
        align="end"
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
