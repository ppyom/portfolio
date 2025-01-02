import { messages } from '@constants';

/**
 * 로그인 버튼을 눌렀을 때 실행될 유효성 검사 함수
 * @param email 입력된 이메일주소
 * @param code 입력된 코드
 * @returns 'OK' 또는 오류메시지
 */
export const checkLoginCode = (email: string, code: string) => {
  if (email === '') {
    return messages.validate.login.emptyEmail;
  }
  if (code === '') {
    return messages.validate.login.emptyCode;
  }

  // TODO 코드 확인 API 호출
  const result = !code;

  return result ? messages.ok : messages.validate.login.invalidCode;
};

/**
 * 이메일 입력 시 이메일 패턴에 맞는지 검사하는 함수
 * @param email 입력된 이메일
 * @returns 오류메시지 또는 undefined
 */
export const checkEmailPattern = (email: string) => {
  if (email === '') {
    return;
  }

  if (!/\w+@\w+\.\w+/.test(email)) {
    return messages.validate.login.invalidEmail;
  }
};
