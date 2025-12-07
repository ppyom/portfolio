'use client';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function TechStackField() {
  const { control, register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'techStacks',
    keyName: 'fieldId',
  });

  return (
    <>
      {fields.map((field, idx) => (
        <div key={field.fieldId} className="flex items-center gap-2">
          <div className="flex-1">
            <Input
              placeholder="유형"
              {...register(`techStacks.${idx}.title`)}
            />
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
            <div className="flex flex-col">
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => move(idx, idx - 1)}
                disabled={idx === 0}
              >
                <ArrowUpIcon />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => move(idx, idx + 1)}
                disabled={idx === fields.length - 1}
              >
                <ArrowDownIcon />
              </Button>
            </div>
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
      ))}
      <Button
        className="w-full"
        type="button"
        onClick={() => append({ title: '', stacks: [] })}
      >
        <PlusIcon /> 기술스택 추가
      </Button>
    </>
  );
}
