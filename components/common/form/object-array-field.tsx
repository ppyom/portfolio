'use client';

import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { GripVerticalIcon, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import ConfirmDeleteButton from '@/components/common/dialog/confirm-delete-button';
import Field from '@/components/common/form/field';
import SortableItem from '@/components/common/form/sortable/item';

const SortableList = dynamic(
  () => import('@/components/common/form/sortable/list'),
  {
    ssr: false,
  },
);

interface Props {
  title: string;
  name: string;
  fieldList: {
    name: string;
    label: string;
    placeholder?: string;
    colSpan?: 'full' | 'half';
    type?: 'input' | 'select';
    options?: { label: string; value: string }[];
    required?: boolean;
  }[];
}

export default function ObjectArrayField({ title, name, fieldList }: Props) {
  const { control, register } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: name,
    keyName: 'fieldId',
  });

  const ids = fields.map((field) => field.fieldId);

  return (
    <SortableList onMove={move} items={ids}>
      {fields.map((field, idx) => (
        <SortableItem key={field.fieldId} id={field.fieldId}>
          {({ listeners, attributes }) => (
            <>
              <div
                className={cn(
                  'flex items-start gap-2',
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
                <div className="flex-1 grid gap-4 sm:grid-cols-2">
                  {fieldList.map((f) => (
                    <Field
                      key={`${field.fieldId}_${f.name}`}
                      className={cn(f.colSpan !== 'half' && 'sm:col-span-2')}
                      label={f.label}
                      required={f.required}
                    >
                      {f.type === 'select' ? (
                        <Controller
                          control={control}
                          name={`${name}.${idx}.${f.name}`}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={f.placeholder || ''}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {f.options?.map((item) => (
                                    <SelectItem
                                      key={item.value}
                                      value={item.value}
                                    >
                                      {item.label}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      ) : (
                        <Input
                          placeholder={f.placeholder}
                          {...register(`${name}.${idx}.${f.name}`)}
                        />
                      )}
                    </Field>
                  ))}
                </div>
                <div className="shrink-0 pt-2">
                  <ConfirmDeleteButton onConfirm={() => remove(idx)} />
                </div>
              </div>
              {idx < fields.length - 1 && (
                <Separator className="my-6 bg-muted/50" />
              )}
            </>
          )}
        </SortableItem>
      ))}
      <Button
        className="w-full"
        variant="secondary"
        type="button"
        onClick={() => append({})}
      >
        <PlusIcon /> {title} 추가
      </Button>
    </SortableList>
  );
}
