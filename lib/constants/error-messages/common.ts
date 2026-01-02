export const commonErrorMessages = {
  retry: (prefix?: string) =>
    [prefix, '잠시 후 다시 시도해주세요.'].filter(Boolean).join(' '),
  unknown: {
    default: '알 수 없는 오류가 발생했습니다.',
  },
  invalid: {
    email: '이메일 주소 형식이 올바르지 않습니다.',
  },
} as const;
