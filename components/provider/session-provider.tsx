'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

// 방문자 레이아웃이 정적으로 렌더링되도록 로그인 상태는 서버(getServerSession)가 아니라 클라이언트에서 조회한다
export function SessionProvider({ children }: Props) {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
}
