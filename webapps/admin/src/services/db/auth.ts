import dayjs from 'dayjs';
import { messages } from '@constants';
import { timestamp } from '@utils/day';
import { insert, selectByEmail, update } from '@db/login';

/**
 * 이미 발급받은 코드가 있는지 확인
 * @param email
 * @returns 발급받은 기록이 있는 경우 id, 없는 경우 undefined
 */
const checkEmail = async (email: string) => {
  const result = await selectByEmail(email);
  return result?.id;
};

/**
 * 로그인 코드 발급 이후 DB에 발급한 정보를 저장
 * @param email 이메일 주소
 * @param code 발급한 코드
 */
export const setLoginCode = async (email: string, code: string) => {
  const id = await checkEmail(email);
  const expiredAt = timestamp(dayjs().add(30, 'minutes'));
  const result = await (!!id
    ? update(id, code, expiredAt)
    : insert(email, code, expiredAt));
  return typeof result !== 'string' ? messages.ok : result;
};

export const checkCode = async (email: string, code: string) => {
  const result = await selectByEmail(email);

  if (result?.code === code && dayjs().isBefore(result?.expiredat)) {
    return messages.ok;
  }

  return messages.error.auth.invalidInformation;
};
