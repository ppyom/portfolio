import { z } from 'zod';

import type messages from '@/messages/ko.json';

type ContactErrorKey = keyof (typeof messages)['ContactForm']['errors'];

/**
 * 문의 폼 검증 스키마를 만드는 함수
 * 방문자 페이지는 언어별로 검증 메시지가 달라야 해서, 번역 함수를 받아 스키마를 만든다.
 * @param t `ContactForm.errors` 네임스페이스의 번역 함수
 * @returns 문의 폼 zod 스키마
 * @example
 * const t = useTranslations('ContactForm.errors');
 * const schema = createSchema(t);
 */
export const createSchema = (t: (key: ContactErrorKey) => string) =>
  z.object({
    name: z.string().nonempty(t('nameRequired')),
    company: z.string(),
    email: z.email(t('emailInvalid')).nonempty(t('emailRequired')),
    title: z.string().nonempty(t('subjectRequired')),
    content: z.string().nonempty(t('contentRequired')),
    // 허니팟: 사람에게는 보이지 않는 칸이라 값이 있으면 봇으로 본다. 봇이 막힌 걸 모르도록 검증 에러는 내지 않는다
    website: z.string().optional(),
  });

export type FormDataType = z.infer<ReturnType<typeof createSchema>>;
