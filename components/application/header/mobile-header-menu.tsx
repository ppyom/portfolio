'use client';

import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';
import { MenuIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/common/theme/theme-toggle';

import HeaderNavigation from './header-navigation';
import { useMobileHeader } from './mobile-header-provider';
import UserMenu from './user-menu';

interface Props {
  session: Session | null;
}

export default function MobileHeaderMenu({ session }: Props) {
  const pathname = usePathname();
  const { open, setOpen } = useMobileHeader();

  return (
    <Sheet key={pathname} open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MenuIcon />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col gap-6 [&>button]:hidden"
      >
        <SheetHeader>
          <SheetTitle hidden />
          <SheetDescription hidden />
          <div className="flex gap-2 items-center justify-between">
            <div className="flex-1">
              <UserMenu session={session} />
            </div>
            <ThemeToggle size="icon-sm" />
            <SheetClose asChild>
              <Button variant="ghost" size="icon-sm">
                <XIcon />
              </Button>
            </SheetClose>
          </div>
        </SheetHeader>
        <HeaderNavigation />
      </SheetContent>
    </Sheet>
  );
}
