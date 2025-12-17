'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useScrollVisibility } from '@/hooks/use-scroll-visibility';

interface Props {
  children: React.ReactNode;
}

export default function HeaderWrapper({ children }: Props) {
  const pathname = usePathname();
  const isIndexPage = pathname === '/';
  const { visible } = useScrollVisibility({ enable: isIndexPage });

  return (
    <header
      className={cn(
        isIndexPage ? 'fixed' : 'sticky',
        'top-0 left-0 w-full z-10',
        'bg-background/90',
        'origin-top transition-transform duration-300',
        isIndexPage && (visible ? 'translate-y-0' : '-translate-y-full'),
      )}
    >
      {children}
    </header>
  );
}
