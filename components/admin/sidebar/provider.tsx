'use client';

import { usePathname } from 'next/navigation';

import { SidebarProvider as Provider } from '@/components/ui/sidebar';

interface Props {
  children: React.ReactNode;
}

export default function SidebarProvider({ children }: Props) {
  const pathname = usePathname();
  return (
    <Provider
      key={pathname}
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      {children}
    </Provider>
  );
}
