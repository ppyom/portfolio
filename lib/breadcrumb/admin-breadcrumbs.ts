import { sidebarItems } from '@/lib/constants/admin-sidebar-items';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
}

function resolveDynamicSegment(
  segment: string,
  parentPath: string,
): string | null {
  if (parentPath === '/manage/projects') {
    return '프로젝트 수정';
  }

  return null;
}

export function getAdminBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const crumbs: BreadcrumbItem[] = [];

  let currentPath = '';

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;

    const staticItem = sidebarItems.find((item) => item.href === currentPath);

    if (staticItem) {
      crumbs.push({
        label: staticItem.label,
        href: staticItem.href,
        isCurrent: index === segments.length - 1,
      });
      return;
    }

    const parentPath = crumbs.length > 0 ? crumbs[crumbs.length - 1].href : '';

    const dynamicLabel = resolveDynamicSegment(segment, parentPath);

    if (dynamicLabel) {
      crumbs.push({
        label: dynamicLabel,
        href: currentPath,
        isCurrent: index === segments.length - 1,
      });
    }
  });

  return crumbs;
}
