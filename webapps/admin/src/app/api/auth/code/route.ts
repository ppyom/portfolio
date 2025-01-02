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
    return response({ message: messages.mail.response.notFound }, 400);
  }

  const code = createCode();
  // TODO DB에 메일주소 / 코드 저장

  try {
    await sendMail(
      email,
      messages.mail.code.title,
      messages.mail.code.body(email, code),
    );

    return response({ message: messages.mail.response.ok }, 200);
  } catch (error) {
    return response({ message: messages.mail.response.fail }, 400);
  }
};
