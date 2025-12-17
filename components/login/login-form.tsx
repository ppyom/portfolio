'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { isValidEmail } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/page-title';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    if (!isValidEmail(username)) {
      setError('아이디 또는 비밀번호를 확인해주세요.');
      return;
    }

    const response = await signIn('credentials', {
      username,
      password,
      redirect: false,
    });

    if (!response) {
      setError('로그인 중 오류가 발생했습니다.');
      return;
    }

    if (response.error) {
      setError('아이디 또는 비밀번호를 확인해주세요.');
      return;
    }

    router.replace(callbackUrl);
  };

  return (
    <div className="max-w-md mx-auto flex flex-col justify-center gap-8 px-4 py-40">
      <PageTitle>로그인</PageTitle>
      <div className="space-y-4">
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
        <Button
          className="w-full cursor-pointer font-semibold"
          onClick={handleLogin}
        >
          로그인
        </Button>
      </div>
    </div>
  );
}
