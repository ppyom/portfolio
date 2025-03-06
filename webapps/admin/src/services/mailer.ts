import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { config } from '@config';

/**
 * 메일 전송 환경 설정 객체
 */
const transport: SMTPTransport.Options = {
  service: config.smtp.service,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

/**
 * 메일 전송을 위한 객체
 */
const transporter = createTransport(transport);

/**
 * 메일을 전송하는 함수
 * @param target 수신자
 * @param title 메일 제목
 * @param body 메일 내용
 */
export const sendMail = (target: string, title: string, body: string) => {
  return transporter.sendMail({
    // 발신자
    from: {
      name: '이예진(PPYOM)',
      address: config.smtp.user,
    },
    // 수신자
    to: target,
    // 제목
    subject: title,
    // 내용
    text: body,
  });
};
