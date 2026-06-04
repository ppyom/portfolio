'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { PlusIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface BaseItem {
  id: string;
}

interface Props<T extends BaseItem> {
  name: string;
  createItem: () => T;
  addButtonText?: string;
  children: (props: {
    field: T;
    index: number;
    remove: () => void;
  }) => React.ReactNode;
  className?: string;
}

const DraggableList = dynamic(
  () =>
    import('@/components/ui/draggable-list').then(
      (mod) => mod.DraggableList<BaseItem>,
    ),
  {
    ssr: false,
  },
);
const DraggableItem = dynamic(
  () =>
    import('@/components/ui/draggable-list').then((mod) => mod.DraggableItem),
  {
    ssr: false,
  },
);

export function FieldArray<T extends BaseItem>({
  name,
  createItem,
  addButtonText = '항목 추가',
  children,
  className,
}: Props<T>) {
  const { control } = useFormContext();
  const { fields, append, remove, replace } = useFieldArray({
    control,
    name,
  });

  return (
    <div className={cn('space-y-2', className)}>
      <DraggableList
        items={fields as BaseItem[]}
        getId={(field) => field.id}
        onChange={(items) => replace(items)}
      >
        {fields.map((field, index) => (
          <DraggableItem key={field.id} id={field.id}>
            {children({
              field: field as T,
              index,
              remove: () => remove(index),
            })}
          </DraggableItem>
        ))}
      </DraggableList>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="w-full gap-2"
        onClick={() => append(createItem())}
      >
        <PlusIcon size={14} />
        {addButtonText}
      </Button>
    </div>
  );
}
