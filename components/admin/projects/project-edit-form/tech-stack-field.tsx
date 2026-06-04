'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Description } from '@/components/ui/description';
import { DragHandle } from '@/components/ui/draggable-list';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldArray } from '@/components/form';

export function TechStackField() {
  const { register, control } = useFormContext();

  return (
    <FieldArray
      className="space-y-8"
      name="techStacks"
      createItem={() => ({
        id: crypto.randomUUID(),
        title: '',
        stacks: [],
      })}
      addButtonText="기술스택 추가"
    >
      {({ index, remove }) => (
        <div className="flex items-start gap-2">
          <DragHandle className="mt-2" />

          <div className="flex-1 space-y-4">
            <Field>
              <Label>유형</Label>
              <Input {...register(`techStacks.${index}.title`)} />
            </Field>

            <Field>
              <Label>기술 스택</Label>
              <Description>
                기술 스택은 콤마(,)로 구분해서 작성해주세요.
              </Description>
              <Controller
                control={control}
                name={`techStacks.${index}.stacks`}
                render={({ field }) => (
                  <Input
                    value={field.value.join(',')}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value
                          .split(',')
                          .map((item) => item.trim())
                          .filter(Boolean),
                      )
                    }
                  />
                )}
              />
            </Field>
          </div>
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
      )}
    </FieldArray>
  );
}
