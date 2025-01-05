import type { NextRequest } from 'next/server';
import { response } from '@services';
import { messages } from '@constants';
import { checkCode } from '@services/db';

/**
 * 로그인
 */
export const POST = async (req: NextRequest) => {
  const { email, code } = await req.json();

  if (!email || !code) {
    return response({ message: messages.login.response.required }, 400);
  }

  const result = await checkCode(email, code);

  if (result === 'OK') {
    // TODO 로그인 정보 저장
    return response({ message: messages.ok }, 200);
  } else {
    return response({ message: result }, 400);
  }
};
