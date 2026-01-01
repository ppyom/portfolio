'use client';

import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import { updateSkillMetadata } from '@/app/manage/skills/action';
import { extractErrorMessage } from '@/lib/utils/extract-error-message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ConfirmDeleteButton from '@/components/common/dialog/confirm-delete-button';
import Field from '@/components/common/form/field';
import FieldGroup from '@/components/common/form/field-group';
import type { SkillMetadata } from '@/types/skill';

interface Props {
  skillMetadata: Record<string, SkillMetadata>;
}

export default function MetadataEditForm({ skillMetadata }: Props) {
  const form = useForm({
    defaultValues: {
      items: Object.entries(skillMetadata).map(([name, value]) => ({
        name,
        color: value.color,
      })),
    },
  });
  const { handleSubmit, setValue, watch, control } = form;

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: 'items',
  });

  return (
    <FormProvider {...form}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(
          (data) => {
            updateSkillMetadata(data)
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
        {fields.map((field, idx) => (
          <FieldGroup
            title={`Skill ${idx + 1}`}
            key={field.id}
            headerActions={
              <ConfirmDeleteButton onConfirm={() => remove(idx)} />
            }
          >
            <Field label="스킬명" required>
              <Input {...form.register(`items.${idx}.name`)} />
            </Field>
            <Field label="색상">
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={watch(`items.${idx}.color`) ?? ''}
                  onChange={({ target }) =>
                    setValue(`items.${idx}.color`, target.value)
                  }
                />
                <Input
                  type="color"
                  value={watch(`items.${idx}.color`) ?? ''}
                  onChange={({ target }) =>
                    setValue(`items.${idx}.color`, target.value)
                  }
                />
              </div>
            </Field>
          </FieldGroup>
        ))}
        <Button
          className="w-full"
          variant="secondary"
          type="button"
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
          <PlusIcon /> 스킬 추가
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
