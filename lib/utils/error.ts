import { toast } from 'sonner';

import { commonErrorMessages } from '@/lib/constants/error-messages';

/**
 * 에러 객체에서 메시지를 추출합니다.
 * @param error unknown
 */
const extractErrorMessage = (error: unknown): string | undefined => {
  if (!error || typeof error !== 'object') return undefined;

  if ('message' in error && typeof error.message === 'string') {
    return error.message;
  }

  for (const value of Object.values(error)) {
    const message = extractErrorMessage(value);
    if (message) return message;
  }

  return undefined;
};

/**
 * 에러를 토스트로 보여주는 함수
 * @param error
 * @param fallbackMessage 에러 메시지가 존재하지 않는 경우 사용할 기본 메시지
 */
export const notifyError = (
  error: unknown,
  fallbackMessage = commonErrorMessages.unknown.default,
) => {
  const message = extractErrorMessage(error) ?? fallbackMessage;
  toast.error(message);
};
