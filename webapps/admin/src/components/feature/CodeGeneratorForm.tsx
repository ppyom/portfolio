'use client';

import { Button, Input, Typography } from '@packages/ui/commons';
import { cn } from '@packages/ui/utils';
import { useInput } from '@hooks';
import { api } from '@services/api';

interface Props
  extends Pick<
    ReturnType<typeof useInput>,
    'value' | 'onChange' | 'error' | 'isEmpty'
  > {
  isGenerated: boolean;
  ok: () => void;
}

export const CodeGeneratorForm = ({
  value: email,
  onChange,
  error,
  isEmpty,
  isGenerated,
  ok,
}: Props) => {
  const handleCodeGeneration = () => {
    api
      .post('auth/code', { email })
      .then(() => {
        console.log('성공!');
        // TODO 완료 처리 필요!!!! (ex. Toast)
        ok();
      })
      .catch((error) => {
        console.error(error.message);
        // TODO 에러 처리 필요!!!! (ex. Toast)
      });
  };

  return (
    <div className="flex flex-wrap">
      <Input
        className={cn('flex-1', !!error && 'border-service-error')}
        placeholder="이메일 주소 입력"
        value={email}
        onChange={onChange}
        disabled={isGenerated}
      />
      <Button
        className="ml-1"
        bg="secondary"
        onClick={handleCodeGeneration}
        disabled={isEmpty || !!error || isGenerated}
      >
        코드 발급
      </Button>
      {error && (
        <Typography type="caption" className="w-full text-service-error">
          {error}
        </Typography>
      )}
    </div>
  );
};
