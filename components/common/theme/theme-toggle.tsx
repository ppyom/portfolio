'use client';

import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@/components/ui/dropdown-menu';

interface Props {
  side?: React.ComponentProps<typeof DropdownContent>['side'];
}

export function ThemeToggle({ side = 'bottom' }: Props) {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownTrigger>
        <Button variant="ghost" className="text-text-muted">
          <SunIcon
            size={14}
            className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          />
          <MoonIcon
            size={14}
            className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownTrigger>

      <DropdownContent side={side}>
        <DropdownItem onClick={() => setTheme('light')}>Light</DropdownItem>
        <DropdownItem onClick={() => setTheme('dark')}>Dark</DropdownItem>
        <DropdownItem onClick={() => setTheme('system')}>System</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  );
}
