import { z } from 'zod';

import { profileErrorMessages } from '@/lib/constants/error-messages';

export const schema = z.object({
  introduce: z.string().array(),
  experience: z
    .object({
      name: z.string(),
      position: z
        .string()
        .nonempty(profileErrorMessages.required.experience.position),
      startDate: z
        .string()
        .nonempty(profileErrorMessages.required.experience.startDate),
      endDate: z.string(),
    })
    .array(),
  education: z
    .object({
      name: z.string().nonempty(profileErrorMessages.required.education.name),
      major: z.string().nonempty(profileErrorMessages.required.education.major),
      startDate: z
        .string()
        .nonempty(profileErrorMessages.required.education.startDate),
      endDate: z.string(),
    })
    .array(),
  history: z
    .object({
      type: z.enum(
        ['learning', 'certification', 'activity'],
        profileErrorMessages.required.history.type,
      ),
      date: z.string().nonempty(profileErrorMessages.required.history.date),
      name: z.string().nonempty(profileErrorMessages.required.history.name),
      description: z.string(),
    })
    .array(),
});

export type FormDataType = z.infer<typeof schema>;
