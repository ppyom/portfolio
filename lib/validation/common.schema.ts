import { z } from 'zod';

export const stringItemSchema = z.object({
  id: z.string(),
  value: z.string(),
});

export type StringItem = z.infer<typeof stringItemSchema>;
