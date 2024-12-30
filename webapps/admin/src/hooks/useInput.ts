import { type ChangeEvent, useEffect, useMemo, useState } from 'react';

interface Props {
  defaultValue?: string;
  rule?: (value: string) => string | undefined | false | null;
}

/**
 * Input을 위한 훅
 * @param defaultValue input의 기본 값
 * @param rule value를 체크해 유효하지 않다면 에러메시지를 반환하는 함수
 * @example 이메일 입력을 처리하는 컴포넌트
 * const Example = () => {
 *   const { value: email, onChange, error } = useInput({ rule: handleCheckEmail });
 *   return (
 *      <div>
 *        <Input value={email} onChange={onChange} />
 *        {error && (
 *          <Typography type="caption" className="text-service-error">
 *            {error}
 *          </Typography>
 *        )}
 *      </div>
 *   );
 * }
 */
export const useInput = ({ defaultValue, rule }: Props = {}) => {
  const [value, setValue] = useState(defaultValue || '');
  const [error, setError] = useState('');

  const isEmpty = useMemo(() => !value.trim(), [value]);

  const handleChangeTextValue = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setError('');
    if (rule) {
      setError(rule(value) || '');
    }
  }, [value]);

  return {
    value,
    onChange: handleChangeTextValue,
    isEmpty,
    error,
    setError,
  };
};
