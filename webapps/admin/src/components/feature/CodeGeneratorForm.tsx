'use client';

import { Button, Input, Typography } from '@packages/ui/commons';
import { cn } from '@packages/ui/utils';
import { useInput } from '@hooks';
import { checkEmailPattern } from '@utils/validate';
import { api } from '@services/api';
import { useRouter } from 'next/navigation';

export const CodeGeneratorForm = () => {
  const { replace } = useRouter();
  const {
    value: email,
    onChange,
    error,
    isEmpty,
  } = useInput({ check: checkEmailPattern });

  const handleCodeGeneration = () => {
    api
      .post('auth/code', { email })
      .then(() => {
        console.log('성공!');
        // TODO 완료 처리 필요!!!! (ex. Toast)
        replace('/login');
      })
      .catch((error) => {
        console.error(error.message);
        // TODO 에러 처리 필요!!!! (ex. Toast)
      });
  };

  return (
    <>
      <div>
        <Input
          className={cn('w-full', !!error && 'border-service-error')}
          placeholder="이메일 주소 입력"
          value={email}
          onChange={onChange}
        />
        {error && (
          <Typography type="caption" className="text-service-error">
            {error}
          </Typography>
        )}
      </div>
      <Button
        bg="secondary"
        onClick={handleCodeGeneration}
        disabled={isEmpty || !!error}
      >
        로그인 코드 발급
      </Button>
    </>
  );
};
