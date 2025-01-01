/**
 * admin에서 사용되는 메시지
 */
export const messages = {
  ok: 'OK',
  mail: {
    code: {
      title: '[PPYOM ADMIN] 로그인을 위한 코드 안내',
      body: (email: string, code: string) =>
        `아래 인증번호를 입력해 로그인 해주세요.\n\t입력된 이메일 ${email}\n\t인증번호 6자리 ${code}`,
    },
  },
  validate: {
    login: {
      emptyCode: '코드를 입력해주세요.',
      invalidCode: '유효하지 않은 코드입니다.',
      invalidEmail: '이메일 형식으로 입력해주세요.',
    },
  },
} as const;
