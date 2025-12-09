import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().optional(),
  category: z.string().optional(),
  githubUrl: z.string().optional(),
  applicationUrl: z.string().optional(),
  tags: z.array(z.string()),
  overview: z.string(),
  features: z.array(z.string()).optional(),
  goals: z.array(z.string()).optional(),
  results: z.array(z.string()).optional(),
  member: z.object({
    size: z.number(),
    role: z.string(),
    responsibilities: z.array(z.string()),
  }),
  techStacks: z.array(
    z.object({
      title: z.string(),
      stacks: z.array(z.string()),
    }),
  ),
});

export type ProjectSchemaType = z.infer<typeof projectSchema>;
