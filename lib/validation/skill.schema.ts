import { z } from 'zod';

import { skillErrorMessages } from '@/lib/constants/error-messages';

export const schema = z.object({
  skills: z
    .object({
      category: z.string().nonempty(skillErrorMessages.required.category),
      items: z.array(z.string()).min(1, skillErrorMessages.required.items),
    })
    .array(),
});

export type FormDataType = z.infer<typeof schema>;
