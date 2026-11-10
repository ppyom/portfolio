import { z } from 'zod';

import { resumeErrorMessages } from '@/lib/constants/error-messages';

// Server Action bodySizeLimit(10mb, next.config.ts)과 맞춘다
export const RESUME_MAX_SIZE_MB = 10;

export const schema = z.object({
  file: z
    .instanceof(File, { message: resumeErrorMessages.required.file })
    .refine((file) => file.size > 0, resumeErrorMessages.required.file)
    .refine(
      (file) => file.type === 'application/pdf',
      resumeErrorMessages.invalid.type,
    )
    .refine(
      (file) => file.size <= RESUME_MAX_SIZE_MB * 1024 * 1024,
      resumeErrorMessages.invalid.size(RESUME_MAX_SIZE_MB),
    ),
});

export type FormDataType = z.infer<typeof schema>;
