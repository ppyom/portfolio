import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().nonempty('프로젝트 제목은 반드시 입력되어야합니다.'),
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
    size: z.number('전체 인원은 반드시 입력되어야합니다.'),
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
