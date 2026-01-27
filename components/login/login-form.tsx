'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { authErrorMessages } from '@/lib/constants/error-messages';
import { isValidEmail } from '@/lib/utils/email';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageTitle from '@/components/common/page-title';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      setError(authErrorMessages.required);
      return;
    }

    if (!isValidEmail(username)) {
      setError(authErrorMessages.invalid);
      return;
    }

    const response = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (!response) {
      setError(authErrorMessages.unknown.login);
      return;
    }

    if (response.error) {
      setError(authErrorMessages.invalid);
      return;
    }

    router.replace(callbackUrl);
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center gap-8 px-4 py-40">
      <PageTitle>로그인</PageTitle>
      <form className="space-y-4" onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="이메일 주소"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        {error && <p className="text-destructive text-sm px-1">{error}</p>}
        <Button type="submit" className="w-full cursor-pointer font-semibold">
          로그인
        </Button>
      </form>
    </div>
  );
}
