import type { NextRequest } from 'next/server';
import { getCookie, response, setCookie } from '@services';
import { messages } from '@constants';
import { checkCode } from '@services/db';
import { generateToken } from '@services/token';
import dayjs from 'dayjs';

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
    const [accessToken, refreshToken] = [
      generateToken({ id: 0, email }, { expiresIn: '1h' }),
      generateToken({ id: 0, email }, { expiresIn: '30d' }, 'refresh'),
    ];

    await setCookie('accessToken', accessToken, {
      expires: dayjs().add(1, 'hours').toDate(),
      httpOnly: true,
    });
    await setCookie('refreshToken', refreshToken, {
      expires: dayjs().add(30, 'days').toDate(),
      httpOnly: true,
    });

    console.log((await getCookie('accessToken'))?.value);

    return response({ message: messages.ok }, 200);
  } else {
    return response({ message: result }, 400);
  }
};
