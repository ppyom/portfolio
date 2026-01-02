/**
 * 에러 객체에서 에러 메시지를 추출하는 함수
 * @deprecated 수정된 함수 사용!! (`@/lib/utils/error.ts`)
 * @param error
 */
export const extractErrorMessage = (error: unknown): string | undefined => {
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
