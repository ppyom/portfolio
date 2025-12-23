'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import SortableList from '@/components/form/sortable/list';
import SortableItem from '@/components/form/sortable/item';

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
                    className="cursor-grab"
                    {...listeners}
                    {...attributes}
                  >
                    <GripVerticalIcon />
                  </Button>
                </div>
                <div className="flex-1 grid gap-4 sm:grid-cols-2">
                  {fieldList.map((f) => (
                    <div
                      key={`${field.fieldId}_${f.name}`}
                      className={cn(
                        'space-y-2',
                        f.colSpan !== 'half' && 'sm:col-span-2',
                      )}
                    >
                      <Label>{f.label}</Label>
                      <Input
                        placeholder={f.placeholder}
                        {...register(`${name}.${idx}.${f.name}`)}
                      />
                    </div>
                  ))}
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
