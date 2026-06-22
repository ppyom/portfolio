'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const excludedPaths = [/^\/projects\/[^/]+$/];

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hasHash = typeof window !== 'undefined' && window.location.hash;
    if (hasHash) return;

    if (excludedPaths.some((path) => path.test(pathname))) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname]);

  return null;
}
