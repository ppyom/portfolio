'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hasHash = typeof window !== 'undefined' && window.location.hash;
    if (hasHash) return;

    const isProjectModal = /^\/projects\/[^/]+$/.test(pathname);
    if (isProjectModal) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname]);

  return null;
}
