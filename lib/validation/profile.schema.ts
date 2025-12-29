import { z } from 'zod';

export const profileSchema = z.object({
  introduce: z.string().array(),
  experience: z
    .object({
      name: z.string(),
      position: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
    .array(),
  education: z
    .object({
      name: z.string(),
      major: z.string(),
      startDate: z.string(),
      endDate: z.string(),
    })
    .array(),
  history: z
    .object({
      type: z.enum(['learning', 'certification', 'activity']),
      name: z.string(),
      date: z.string(),
      description: z.string(),
    })
    .array(),
});
