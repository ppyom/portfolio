'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2Icon } from 'lucide-react';

import { updateSkillsAction } from '@/app/manage/skills/actions';
import { notifyError } from '@/lib/utils/error';
import { FormDataType, schema } from '@/lib/validation/skill.schema';
import { Button } from '@/components/ui/button';
import { DragHandle } from '@/components/ui/draggable-list';
import { Field } from '@/components/ui/field';
import { FormSection } from '@/components/ui/form-section';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';
import { FieldArray, StringArrayField } from '@/components/form';
import type { Skill } from '@/types/skill';

import {
  createSkillDefaultValues,
  createSkillPayload,
} from './skill-edit-form.utils';

interface Props {
  defaultSkills?: Skill[];
}

export function SkillEditForm({ defaultSkills = [] }: Props) {
  const form = useForm<FormDataType>({
    resolver: zodResolver(schema),
    defaultValues: createSkillDefaultValues(defaultSkills),
  });
  const { register, handleSubmit } = form;

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          async (data: FormDataType) => {
            const payload = createSkillPayload(data);
            const result = await updateSkillsAction(payload);
            if (result.success) {
              toast.success('저장되었습니다.');
            } else {
              toast.error(result.message);
            }
          },
          (error) => notifyError(error),
        )}
      >
        <FieldArray
          className="space-y-4 mb-8"
          name="skills"
          addButtonText="스킬 그룹 추가"
          createItem={() => ({
            id: crypto.randomUUID(),
            category: '',
            items: [],
          })}
        >
          {({ index, remove }) => (
            <FormSection
              className="relative"
              title={`Skill Group ${index + 1}`}
            >
              <div className="absolute top-6 right-6 flex gap-2">
                <DragHandle />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-text-muted"
                  onClick={remove}
                >
                  <Trash2Icon size={14} />
                </Button>
              </div>
              <div className="flex-1 space-y-4">
                <Field required>
                  <Label required>카테고리</Label>
                  <Input {...register(`skills.${index}.category`)} />
                </Field>
                <Field required>
                  <Label required>보유 스킬</Label>
                  <StringArrayField name={`skills.${index}.items`} />
                </Field>
              </div>
            </FormSection>
          )}
        </FieldArray>
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
