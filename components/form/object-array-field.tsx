'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Trash2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Description } from '@/components/ui/description';
import { DragHandle } from '@/components/ui/draggable-list';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { FieldArray } from '@/components/form';
import type { FieldItem } from '@/types/field-item';

interface Props {
  title: string;
  name: string;
  fieldList: FieldItem[];
}

export function ObjectArrayField({ title, name, fieldList }: Props) {
  const { control, register } = useFormContext();

  return (
    <FieldArray
      className="space-y-8"
      name={name}
      addButtonText={`${title} 추가`}
      createItem={() => ({
        id: crypto.randomUUID(),
      })}
    >
      {({ field, index, remove }) => (
        <div className="flex items-start gap-2">
          <DragHandle className="mt-2" />
          <div className="flex-1 grid gap-4 sm:grid-cols-2">
            {fieldList.map((item, idx) => (
              <Field
                key={`${field.id}_${item.name}`}
                required={item.required}
                className={cn(item.colSpan !== 'half' && 'sm:col-span-2')}
              >
                <div className="flex flex-col sm:flex-row gap-2 sm:items-end">
                  <Label
                    htmlFor={`${item.name}${idx}`}
                    required={item.required}
                  >
                    {item.label}
                  </Label>
                  {item.placeholder && (
                    <Description>{item.placeholder}</Description>
                  )}
                </div>
                {item.type === 'select' ? (
                  <Controller
                    control={control}
                    name={`${name}.${index}.${item.name}`}
                    render={({ field }) => (
                      <Select
                        id={`${item.name}${idx}`}
                        value={field.value ?? ''}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <option value="" disabled>
                          선택
                        </option>

                        {item.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </Select>
                    )}
                  />
                ) : (
                  <Input
                    id={`${item.name}${idx}`}
                    {...register(`${name}.${index}.${item.name}`)}
                  />
                )}
              </Field>
            ))}
          </div>
          <Button
            className="text-text-muted mt-2"
            type="button"
            variant="ghost"
            size="sm"
            onClick={remove}
          >
            <Trash2Icon size={14} />
          </Button>
        </div>
      )}
    </FieldArray>
  );
}
