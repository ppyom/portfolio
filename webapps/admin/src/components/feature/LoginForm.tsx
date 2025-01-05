'use client';

import { useEffect, useRef } from 'react';
import { Button, Input, Typography } from '@packages/ui/commons';
import { cn } from '@packages/ui/utils';
import { useInput } from '@hooks';
import { checkLoginCode } from '@utils/validate';

interface Props {
  email: string;
  isGenerated: boolean;
}

export const LoginForm = ({ email, isGenerated }: Props) => {
  const codeRef = useRef<HTMLInputElement>(null);
  const {
    value: code,
    onChange: handleCodeChange,
    isEmpty,
    error,
    setError,
  } = useInput();

  const handleLoginButtonClick = async () => {
    const result = await checkLoginCode(email, code);
    if (result !== 'OK') {
      setError(result);
    }
  };

  useEffect(() => {
    if (isGenerated) {
      codeRef.current?.focus();
    }
  }, [isGenerated]);

  return (
    <>
      {isGenerated && (
        <div>
          <Input
            ref={codeRef}
            className={cn('w-full', !!error && 'border-service-error')}
            placeholder="로그인 코드 입력"
            value={code}
            onChange={handleCodeChange}
          />
          {error && (
            <Typography type="caption" className="text-service-error">
              {error}
            </Typography>
          )}
        </div>
      )}
      <Button
        bg="secondary"
        onClick={handleLoginButtonClick}
        disabled={!isGenerated || !!error}
      >
        로그인
      </Button>
    </>
  );
};
