import Link from 'next/link';
import { headerNavItems } from '@/lib/constants/header-nav-items';

export default function HeaderNavigation() {
  return (
    <nav className="flex-1 flex flex-col items-center sm:flex-row sm:justify-center gap-6 text-sm font-medium">
      {headerNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          scroll={item.type !== 'anchor' || undefined}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
