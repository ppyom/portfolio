'use client';

import { Fragment } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SortableList from '@/components/form/sortable/list';
import SortableItem from '@/components/form/sortable/item';

interface Props {
  title: string;
  name: string;
  fieldList: { name: string; label: string; placeholder?: string }[];
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
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
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
              <div className="flex-1 grid grid-cols-[100px_1fr]">
                {fieldList.map((f) => (
                  <Fragment key={`${field.fieldId}_${f.name}`}>
                    <Label>{f.label}</Label>
                    <Input
                      placeholder={f.placeholder}
                      {...register(`${name}.${idx}.${f.name}`)}
                    />
                  </Fragment>
                ))}
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
