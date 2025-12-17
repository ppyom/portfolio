'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
}

export default function HeaderWrapper({ children }: Props) {
  const pathname = usePathname();
  const isIndexPage = pathname === '/';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isIndexPage) {
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [isIndexPage]);

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
