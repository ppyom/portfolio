'use client';

import { cn } from '@/lib/utils';
import { useScrollVisibility } from '@/hooks/use-scroll-visibility';
import { usePathname } from '@/i18n/navigation';

interface Props {
  children: React.ReactNode;
}

export function HeaderWrapper({ children }: Props) {
  const pathname = usePathname();
  const isIndexPage = pathname === '/';
  const { visible } = useScrollVisibility({ enable: isIndexPage });

  return (
    <header
      className={cn(
        isIndexPage ? 'fixed' : 'sticky',
        'top-0 left-0 w-full z-10',
        'bg-surface-primary/90',
        'origin-top transition-transform duration-300',
        isIndexPage && (visible ? 'translate-y-0' : '-translate-y-full'),
      )}
    >
      {children}
    </header>
  );
}
