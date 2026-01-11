'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { GripVerticalIcon, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ConfirmDeleteButton from '@/components/common/dialog/confirm-delete-button';
import ArrayField from '@/components/common/form/array-field';
import Field from '@/components/common/form/field';
import FieldGroup from '@/components/common/form/field-group';
import SortableItem from '@/components/common/sortable/item';
import SortableList from '@/components/common/sortable/list';

export default function SkillField() {
  const { control, register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'skills',
    keyName: 'fieldId',
  });

  const ids = fields.map((field) => field.fieldId);

  return (
    <SortableList onMove={move} items={ids}>
      {fields.map((field, idx) => (
        <SortableItem key={field.fieldId} id={field.fieldId}>
          {({ listeners, attributes }) => (
            <FieldGroup
              title={`Skill Group ${idx + 1}`}
              headerActions={
                <>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="cursor-grab touch-none"
                    {...listeners}
                    {...attributes}
                  >
                    <GripVerticalIcon />
                  </Button>
                  <ConfirmDeleteButton onConfirm={() => remove(idx)} />
                </>
              }
            >
              <div
                className={cn(
                  'flex items-start gap-2',
                  idx === fields.length - 1 && 'mb-6',
                )}
              >
                <div className="flex-1 grid gap-4">
                  <Field label="카테고리" required>
                    <Input {...register(`skills.${idx}.category`)} />
                  </Field>
                  <Field label="보유 스킬" required>
                    <ArrayField name={`skills.${idx}.items`} />
                  </Field>
                </div>
              </div>
            </FieldGroup>
          )}
        </SortableItem>
      ))}
      <Button
        className="w-full"
        variant="secondary"
        type="button"
        onClick={() => append({ category: '', items: [] })}
      >
        <PlusIcon /> 스킬 추가
      </Button>
    </SortableList>
  );
}
