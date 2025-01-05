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
    response: {
      ok: '성공적으로 전송을 완료했습니다.',
      fail: '메일을 전송하지 못했습니다.',
      notFound: '이메일주소가 존재하지 않습니다.',
    },
  },
  validate: {
    login: {
      emptyEmail: '이메일 주소를 입력해주세요.',
      emptyCode: '코드를 입력해주세요.',
      invalidCode: '유효하지 않은 코드입니다.',
      invalidEmail: '이메일 형식으로 입력해주세요.',
    },
  },
  error: {
    db: '데이터 처리 중 오류가 발생했습니다.',
    unknown: '알 수 없는 오류가 발생했습니다.',
  },
} as const;
