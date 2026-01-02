import { z } from 'zod';

import {
  commonErrorMessages,
  contactErrorMessages,
} from '@/lib/constants/error-messages';

export const schema = z.object({
  name: z.string().nonempty(contactErrorMessages.required.name),
  company: z.string(),
  email: z
    .email(commonErrorMessages.invalid.email)
    .nonempty(contactErrorMessages.required.email),
  title: z.string().nonempty(contactErrorMessages.required.title),
  content: z.string().nonempty(contactErrorMessages.required.content),
});

export type FormDataType = z.infer<typeof schema>;
