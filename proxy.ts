import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export const config = {
  // api, Next 내부 경로, 정적 파일(확장자 있는 경로)을 제외한 모든 경로
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

const localePrefixPattern = new RegExp(
  `^/(${routing.locales.join('|')})(?=/|$)`,
);

const stripLocale = (pathname: string) =>
  pathname.replace(localePrefixPattern, '') || '/';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 관리자는 한국어 전용이라 언어 라우팅을 거치지 않는다
  if (pathname.startsWith('/manage')) {
    const token = await getToken({ req: request });

    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (!token.user.admin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (stripLocale(pathname) === '/login') {
    const token = await getToken({ req: request });

    if (token) {
      const localePrefix = pathname.match(localePrefixPattern)?.[0] ?? '';
      return NextResponse.redirect(new URL(localePrefix || '/', request.url));
    }
  }

  return handleI18nRouting(request);
}
