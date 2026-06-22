'use client';

import { usePathname } from 'next/navigation';
import type { Session } from 'next-auth';
import { MenuIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme/theme-toggle';

import { HeaderNavigation } from './header-navigation';
import { UserMenu } from './user-menu';

interface Props {
  session: Session | null;
}

export function MobileHeaderMenu({ session }: Props) {
  const pathname = usePathname();

  return (
    <Sheet key={pathname}>
      <SheetTrigger>
        <Button variant="ghost" size="sm">
          <MenuIcon size={14} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col p-4 gap-6 [&>button]:hidden"
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="flex-1 ml-2">
            <UserMenu session={session} />
          </div>
          <ThemeToggle />
          <SheetClose>
            <Button className="text-text-muted" variant="ghost" size="sm">
              <XIcon size={14} />
            </Button>
          </SheetClose>
        </div>
        <nav className="flex flex-col items-center gap-6 text-sm font-medium">
          <HeaderNavigation />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
