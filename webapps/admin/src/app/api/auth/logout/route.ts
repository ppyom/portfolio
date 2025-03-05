import { response, setCookie } from '@services';
import { messages } from '@constants';

export const POST = async () => {
  await setCookie('accessToken', '', {
    expires: 0,
    httpOnly: true,
  });
  await setCookie('refreshToken', '', {
    expires: 0,
    httpOnly: true,
  });

  return response({ message: messages.ok }, 200);
};
