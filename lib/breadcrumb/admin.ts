import { sidebarItems } from '@/lib/constants/admin-sidebar-items';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent: boolean;
}

/**
 * 동적 세그먼트에 해당하는 페이지의 label을 반환하는 함수
 * @param segment
 * @param parentPath
 */
function resolveDynamicSegment(
  segment: string,
  parentPath: string,
): string | null {
  if (parentPath === '/manage/projects') {
    return '프로젝트 수정';
  }
  if (parentPath === '/manage/skills') {
    return '스킬 메타데이터 관리';
  }
  if (parentPath === '/manage/inbox') {
    return '받은 메시지 상세';
  }

  return null;
}

/**
 * 현재 경로를 기준으로 관리자 페이지 Breadcrumb 배열을 생성하는 함수
 * @param pathname
 */
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
