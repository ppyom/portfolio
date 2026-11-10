'use client';

import { headerNavItems } from '@/lib/constants/header-nav-items';
import { Link } from '@/i18n/navigation';

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
