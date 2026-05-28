'use client';

import { PanelLeftIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useAdminLayout } from './admin-layout-context';

interface Props {
  className?: string;
}

export function AdminSidebarTrigger({ className }: Props) {
  const { toggleSidebar } = useAdminLayout();

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
      className={cn(
        'inline-flex size-9 p-0 cursor-pointer items-center justify-center',
        className,
      )}
    >
      <PanelLeftIcon size={18} />
    </Button>
  );
}
