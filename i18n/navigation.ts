import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

// 방문자 페이지에서는 next/link, next/navigation 대신 이 파일의 API를 써야 현재 언어가 유지된다
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
