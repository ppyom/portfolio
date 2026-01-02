export const errorMessages = {
  retry: (prefix?: string) =>
    [prefix, '잠시 후 다시 시도해주세요.'].filter(Boolean).join(' '),
  required: {
    name: '이름은 필수 입력 항목입니다.',
    email: '이메일은 필수 입력 항목입니다.',
    title: '제목은 필수 입력 항목입니다.',
    content: '내용은 필수 입력 항목입니다.',
  },
  invalid: {
    email: '이메일 주소 형식이 올바르지 않습니다.',
  },
} as const;
