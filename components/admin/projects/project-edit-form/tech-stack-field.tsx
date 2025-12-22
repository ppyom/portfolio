'use client';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import SortableList from '@/components/form/sortable/list';
import SortableItem from '@/components/form/sortable/item';

export default function TechStackField() {
  const { control, register } = useFormContext();
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
            <div key={field.fieldId} className="flex items-center gap-2">
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
              <div className="flex-1 grid grid-cols-[100px_1fr]">
                <Label>유형</Label>
                <Input
                  placeholder="유형"
                  {...register(`techStacks.${idx}.title`)}
                />
                <Label>기술 스택</Label>
                <Controller
                  control={control}
                  name={`techStacks.${idx}.stacks`}
                  render={({ field: stacksField }) => (
                    <Input
                      value={stacksField.value?.join(',') ?? ''}
                      onChange={({ target }) =>
                        stacksField.onChange(
                          target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        )
                      }
                      placeholder="기술 스택 (,로 구분)"
                    />
                  )}
                />
              </div>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
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
