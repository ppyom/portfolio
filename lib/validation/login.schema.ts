import { z } from 'zod';

import { authErrorMessages } from '@/lib/constants/error-messages';

export const schema = z.object({
  username: z.string().min(1, authErrorMessages.required),
  password: z.string().min(1, authErrorMessages.required),
});

export type FormDataType = z.infer<typeof schema>;
