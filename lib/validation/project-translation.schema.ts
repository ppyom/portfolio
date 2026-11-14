import { z } from 'zod';

import { stringItemSchema } from '@/lib/validation/common.schema';

// 번역은 비워두면 한국어 원본을 쓰므로 필수 항목이 없다
export const schema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  overview: z.string(),
  features: z.array(stringItemSchema),
  goals: z.array(stringItemSchema),
  results: z.array(stringItemSchema),
  member: z.object({
    role: z.string(),
    responsibilities: z.array(stringItemSchema),
  }),
});

export type FormDataType = z.infer<typeof schema>;
