import { z } from 'zod';

import { projectErrorMessages } from '@/lib/constants/error-messages';

const imageItemSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string(),
    type: z.literal('remote'),
    url: z.string(),
    deleted: z.boolean().optional(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('local'),
    url: z.string(),
    file: z.instanceof(File),
  }),
]);

export const schema = z.object({
  title: z.string().nonempty(projectErrorMessages.required.title),
  isPublic: z.boolean(),
  description: z.string(),
  category: z.string(),
  githubUrl: z.string(),
  applicationUrl: z.string(),
  tags: z.array(z.string()),
  overview: z.string(),
  features: z.array(z.string()),
  goals: z.array(z.string()),
  results: z.array(z.string()),
  member: z.object({
    size: z
      .number(projectErrorMessages.required.member.size)
      .min(1, projectErrorMessages.length.member.size),
    role: z.string(),
    responsibilities: z.array(z.string()),
  }),
  techStacks: z.array(
    z.object({
      title: z.string(),
      stacks: z.array(z.string()),
    }),
  ),
  coverImage: z.array(imageItemSchema),
  images: z.array(imageItemSchema),
});

export type FormDataType = z.infer<typeof schema>;
