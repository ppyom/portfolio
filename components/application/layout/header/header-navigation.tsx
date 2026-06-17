'use client';

import Link from 'next/link';

import { headerNavItems } from '@/lib/constants/header-nav-items';

export function HeaderNavigation() {
  return (
    <>
      {headerNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          scroll={item.type !== 'anchor' || undefined}
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}
