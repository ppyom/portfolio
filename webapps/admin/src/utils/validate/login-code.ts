import { messages } from '@constants';

/**
 * 로그인 버튼을 눌렀을 때 실행될 유효성 검사 함수
 * @param code 입력된 코드
 * @returns 'OK' 또는 오류메시지
 */
export const checkLoginCode = (code: string) => {
  if (code === '') {
    return messages.validate.login.emptyCode;
  }

  // TODO 코드 확인 API 호출
  const result = !code;

  return result ? messages.ok : messages.validate.login.invalidCode;
};
