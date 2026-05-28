'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRightIcon } from 'lucide-react';

import { getAdminBreadcrumbs } from '@/lib/breadcrumb/admin';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export function AdminBreadcrumb({ className }: Props) {
  const pathname = usePathname();
  const breadcrumbs = getAdminBreadcrumbs(pathname);

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'flex min-w-0 items-center gap-1 text-sm text-text-secondary',
        className,
      )}
    >
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <Fragment key={item.href}>
            {index > 0 && (
              <ChevronRightIcon
                size={14}
                className="shrink-0 text-text-muted"
              />
            )}

            {isLast ? (
              <span className="truncate font-medium text-text-primary">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="truncate transition-colors hover:text-text-primary"
              >
                {item.label}
              </Link>
            )}
          </Fragment>
        );
      })}
    </nav>
  );
}
