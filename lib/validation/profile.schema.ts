import { z } from 'zod';

import { errorMessages } from '@/lib/constants/error-messages';

const { profile } = errorMessages.required;

export const schema = z.object({
  introduce: z.string().array(),
  experience: z
    .object({
      name: z.string(),
      position: z.string().nonempty(profile.experience.position),
      startDate: z.string().nonempty(profile.experience.startDate),
      endDate: z.string(),
    })
    .array(),
  education: z
    .object({
      name: z.string().nonempty(profile.education.name),
      major: z.string().nonempty(profile.education.major),
      startDate: z.string().nonempty(profile.education.startDate),
      endDate: z.string(),
    })
    .array(),
  history: z
    .object({
      type: z.enum(
        ['learning', 'certification', 'activity'],
        profile.history.type,
      ),
      date: z.string().nonempty(profile.history.date),
      name: z.string().nonempty(profile.history.name),
      description: z.string(),
    })
    .array(),
});

export type FormDataType = z.infer<typeof schema>;
