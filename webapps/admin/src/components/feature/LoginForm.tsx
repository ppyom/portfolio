'use client';

import { Button, Input, Typography } from '@packages/ui/commons';
import { cn } from '@packages/ui/utils';
import { useInput } from '@hooks';
import { checkLoginCode } from '@utils/validate';

export const LoginForm = () => {
  const {
    value: code,
    onChange: handleCodeChange,
    error,
    setError,
  } = useInput();

  const handleLoginButtonClick = () => {
    const result = checkLoginCode(code);
    if (result !== 'OK') {
      setError(result);
    }
  };

  return (
    <>
      <div>
        <Input
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
      <Button
        bg="secondary"
        onClick={handleLoginButtonClick}
        disabled={code === ''}
      >
        로그인
      </Button>
    </>
  );
};
