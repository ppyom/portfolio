'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { GripVerticalIcon, PlusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
                    >
                      <Input
                        placeholder={f.placeholder}
                        {...register(`${name}.${idx}.${f.name}`)}
                      />
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
