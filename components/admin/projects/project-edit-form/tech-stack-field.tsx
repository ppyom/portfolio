'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { GripVerticalIcon, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ConfirmDeleteButton from '@/components/common/dialog/confirm-delete-button';
import Field from '@/components/common/form/field';
import SortableItem from '@/components/common/form/sortable/item';

const SortableList = dynamic(
  () => import('@/components/common/form/sortable/list'),
  {
    ssr: false,
  },
);

export default function TechStackField() {
  const { control, register, watch, setValue } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'techStacks',
    keyName: 'fieldId',
  });

  const ids = fields.map((field) => field.fieldId);

  return (
    <SortableList items={ids} onMove={move}>
      {fields.map((field, idx) => (
        <SortableItem key={field.fieldId} id={field.fieldId}>
          {({ listeners, attributes }) => (
            <div
              key={field.fieldId}
              className={cn(
                'flex items-center gap-2',
                idx === fields.length - 1 && 'mb-6',
              )}
            >
              <div className="shrink-0 pt-2">
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
              </div>
              <div className="flex-1 grid gap-1">
                <Field label="유형">
                  <Input
                    placeholder="유형"
                    {...register(`techStacks.${idx}.title`)}
                  />
                </Field>
                <Field label="기술 스택">
                  <Input
                    value={watch(`techStacks.${idx}.stacks`).join(',')}
                    onChange={({ target }) =>
                      setValue(
                        `techStacks.${idx}.stacks`,
                        target.value.split(','),
                      )
                    }
                    placeholder="기술 스택 (,로 구분)"
                  />
                </Field>
              </div>
              <div className="shrink-0 pt-2">
                <ConfirmDeleteButton onConfirm={() => remove(idx)} />
              </div>
            </div>
          )}
        </SortableItem>
      ))}
      <Button
        className="w-full"
        variant="secondary"
        type="button"
        onClick={() => append({ title: '', stacks: [] })}
      >
        <PlusIcon /> 기술스택 추가
      </Button>
    </SortableList>
  );
}
