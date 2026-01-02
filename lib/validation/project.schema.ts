import { z } from 'zod';

import { errorMessages } from '@/lib/constants/error-messages';

export const schema = z.object({
  title: z.string().nonempty(errorMessages.required.project.title),
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
      .number(errorMessages.required.project.member.size)
      .min(1, errorMessages.length.project.member.size),
    role: z.string(),
    responsibilities: z.array(z.string()),
  }),
  techStacks: z.array(
    z.object({
      title: z.string(),
      stacks: z.array(z.string()),
    }),
  ),
  coverImageFile: z.instanceof(File).optional(),
  imageFiles: z.array(z.instanceof(File)).optional(),
  existedCoverImage: z.array(
    z.object({
      id: z.string(),
      url: z.string(),
      deleted: z.boolean(),
    }),
  ),
  existedImages: z.array(
    z.object({ id: z.string(), url: z.string(), deleted: z.boolean() }),
  ),
});

export type FormDataType = z.infer<typeof schema>;
