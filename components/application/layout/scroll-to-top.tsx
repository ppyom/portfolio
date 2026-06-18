'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const hasHash = typeof window !== 'undefined' && window.location.hash;

    // hash가 있으면 브라우저 기본 이동으로 처리
    if (hasHash) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname]);

  return null;
}
