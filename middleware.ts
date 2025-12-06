import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/login', '/manage/:path*'],
};

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthenticated = !!token;

  if (request.nextUrl.pathname === '/login') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/manage')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    } else if (!token.user.admin) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}
