import { NextRequest } from 'next/server';
import { response, sendMail } from '@services';
import { messages } from '@constants';
import { createCode } from '@utils';

/**
 * 코드를 발급하는 API
 */
export const POST = async (req: NextRequest) => {
  const { email } = await req.json();

  if (!email) {
    return response({ message: '이메일주소가 존재하지 않습니다.' }, 400);
  }

  const code = createCode();
  // TODO DB에 메일주소 / 코드 저장

  try {
    await sendMail(
      email,
      messages.mail.code.title,
      messages.mail.code.body(email, code),
    );

    return response({ message: '성공적으로 전송을 완료했습니다.' }, 200);
  } catch (error) {
    return response({ message: '메일을 전송하지 못했습니다.' }, 400);
  }
};
