import { z } from 'zod';

import { errorMessages } from '@/lib/constants/error-messages';

export const schema = z.object({
  name: z.string().nonempty(errorMessages.required.name),
  company: z.string(),
  email: z
    .email(errorMessages.invalid.email)
    .nonempty(errorMessages.required.email),
  title: z.string().nonempty(errorMessages.required.title),
  content: z.string().nonempty(errorMessages.required.content),
});

export type FormDataType = z.infer<typeof schema>;
