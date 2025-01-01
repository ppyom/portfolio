'use client';

import { Button, Input, Typography } from '@packages/ui/commons';
import { cn } from '@packages/ui/utils';
import { useInput } from '@hooks';
import { checkEmailPattern } from '@utils/validate';

export const CodeGeneratorForm = () => {
  const {
    value: email,
    onChange,
    error,
    isEmpty,
  } = useInput({ check: checkEmailPattern });

  const handleCodeGeneration = () => {
    // TODO 코드 발급
    // 완료 시 로그인으로 이동
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
