'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import SortableList from '@/components/form/sortable/list';
import SortableItem from '@/components/form/sortable/item';
import Field from '@/components/form/field';

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
                  className="cursor-grab"
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
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => remove(idx)}
                >
                  <Trash2Icon />
                </Button>
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
