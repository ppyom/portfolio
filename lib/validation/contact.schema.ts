import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().nonempty('이름은 필수로 입력해야합니다.'),
  company: z.string(),
  email: z
    .email('이메일 주소 형식으로 입력해야합니다.')
    .nonempty('이메일은 필수로 입력해야합니다.'),
  title: z.string().nonempty('제목은 필수로 입력해야합니다.'),
  content: z.string().nonempty('내용은 필수로 입력해야합니다.'),
});

export type FormDataType = z.infer<typeof contactSchema>;
