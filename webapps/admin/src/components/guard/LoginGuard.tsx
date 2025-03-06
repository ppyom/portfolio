import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ChildrenProps } from '@packages/types/components';

interface Props extends ChildrenProps {
  hasLogin?: boolean;
}

export const LoginGuard = async ({ children, hasLogin = true }: Props) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken === hasLogin) {
    return redirect(hasLogin ? 'login' : '/');
  }

  return <>{children}</>;
};
