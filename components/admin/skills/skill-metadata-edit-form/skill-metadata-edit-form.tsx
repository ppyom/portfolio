'use client';

import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { PlusIcon } from 'lucide-react';

import { updateSkillMetadataAction } from '@/app/manage/skills/actions';
import { skillErrorMessages } from '@/lib/constants/error-messages';
import { notifyError } from '@/lib/utils/error';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { FormSection } from '@/components/ui/form-section';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/toast';
import { DeleteButton, DeleteDialog } from '@/components/delete';
import type { SkillMetadata } from '@/types/skill';

import { createSkillMetadataDefaultValues } from './skill-metadata-edit-form.utils';

interface Props {
  skillMetadata: Record<string, SkillMetadata>;
}

export function SkillMetadataEditForm({ skillMetadata }: Props) {
  const form = useForm({
    defaultValues: createSkillMetadataDefaultValues(skillMetadata),
  });
  const { register, handleSubmit, control } = form;
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'items',
  });

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          async (data) => {
            const result = await updateSkillMetadataAction(data);
            if (result.success) {
              toast.success('저장되었습니다.');
            } else {
              toast.error(result.message);
            }
          },
          (error) => notifyError(error),
        )}
      >
        {fields.map((field, idx) => (
          <FormSection
            key={field.id}
            className="relative"
            title={`Skill ${idx + 1}`}
          >
            <DeleteDialog onConfirm={() => remove(idx)}>
              <DeleteButton className="absolute top-6 right-6" />
            </DeleteDialog>
            <div className="space-y-6">
              <Field required>
                <Label required>스킬명</Label>
                <Input
                  {...register(`items.${idx}.name`, {
                    required: skillErrorMessages.required.metadata,
                  })}
                />
              </Field>
              <Field>
                <Label>색상</Label>
                <Controller
                  control={control}
                  name={`items.${idx}.color`}
                  render={({ field }) => (
                    <div className="flex gap-2">
                      <Input
                        className="flex-1"
                        type="text"
                        value={field.value ?? ''}
                        onChange={field.onChange}
                      />
                      <Input
                        className="w-12 p-1"
                        type="color"
                        value={field.value ?? '#000000'}
                        onChange={field.onChange}
                      />
                    </div>
                  )}
                />
              </Field>
            </div>
          </FormSection>
        ))}
        <Button
          className="w-full space-x-2"
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            append({ name: '', color: '#000000' });

            requestAnimationFrame(() => {
              document.body.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
              });
            });
          }}
        >
          <PlusIcon size={14} /> 스킬 추가
        </Button>
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
