import { z } from 'zod';

import { errorMessages } from '@/lib/constants/error-messages';

export const schema = z.object({
  skills: z
    .object({
      category: z.string().nonempty(errorMessages.required.skills.category),
      items: z.array(z.string()).min(1, errorMessages.required.skills.items),
    })
    .array(),
});

export type FormDataType = z.infer<typeof schema>;
