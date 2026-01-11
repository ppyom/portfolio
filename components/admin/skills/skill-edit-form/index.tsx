'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { updateSkillsAction } from '@/app/manage/skills/actions';
import { notifyError } from '@/lib/utils/error';
import { FormDataType, schema } from '@/lib/validation/skill.schema';
import { Button } from '@/components/ui/button';
import type { Skill } from '@/types/skill';

import SkillField from './skill-field';

interface Props {
  defaultSkills?: Skill[];
}

export default function SkillEditForm({ defaultSkills = [] }: Props) {
  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
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
          async (data: FormDataType) => {
            try {
              const result = await updateSkillsAction(data);
              if (!result.success) {
                throw new Error(result.message);
              }
              toast.success('저장되었습니다.');
            } catch (error) {
              notifyError(error);
            }
          },
          (error) => notifyError(error),
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
