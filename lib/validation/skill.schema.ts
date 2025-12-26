import { z } from 'zod';

export const skillsSchema = z.object({
  skills: z
    .object({
      category: z.string(),
      items: z.string().array(),
    })
    .array(),
});
