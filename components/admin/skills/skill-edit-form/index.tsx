'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';

import { updateSkillsAction } from '@/app/manage/skills/action';
import { extractErrorMessage } from '@/lib/utils/extract-error-message';
import { skillsSchema } from '@/lib/validation/skill.schema';
import { Button } from '@/components/ui/button';
import type { Skill } from '@/types/skill';

import SkillField from './skill-field';

interface Props {
  defaultSkills?: Skill[];
}

export type FormDataType = z.infer<typeof skillsSchema>;

export default function SkillEditForm({ defaultSkills = [] }: Props) {
  const form = useForm<FormDataType>({
    resolver: zodResolver(skillsSchema),
    defaultValues: {
      skills: defaultSkills.map((skill) => ({
        category: skill.category ?? undefined,
        items: skill.items ?? [],
      })),
    },
  });
  const { handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          (data: FormDataType) => {
            updateSkillsAction(data)
              .then((result) => {
                if (!result.success) {
                  throw new Error(result.message);
                }
                toast.success('저장되었습니다.');
              })
              .catch((error) => {
                toast.error(
                  error instanceof Error
                    ? error.message
                    : '알 수 없는 오류가 발생했습니다.',
                );
              });
          },
          (error) => {
            toast.error(extractErrorMessage(error));
          },
        )}
      >
        <SkillField />
        <Button
          className="w-full sticky bottom-4 font-semibold"
          size="lg"
          type="submit"
        >
          저장하기
        </Button>
      </form>
    </FormProvider>
  );
}
