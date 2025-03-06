'use client';

import { useRouter } from 'next/navigation';
import { cn } from '@packages/ui/utils';
import { api } from '@services/api';

export const LogoutButton = () => {
  const router = useRouter();
  const logout = () => {
    api
      .post('auth/logout')
      .then((res) => {
        if (res.message === 'OK') {
          router.refresh();
        }
      })
      .catch(console.error);
  };
  return (
    <button className={cn('absolute bottom-4 right-4')} onClick={logout}>
      로그아웃
    </button>
  );
};
