'use client';

import dynamic from 'next/dynamic';
import { GripVerticalIcon, PlusIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useStringArray } from '@/hooks/use-string-array';
import { cn } from '@/lib/utils';
import SortableItem from '@/components/common/form/sortable/item';
import ConfirmDeleteButton from '@/components/common/dialog/confirm-delete-button';

const SortableList = dynamic(
  () => import('@/components/common/form/sortable/list'),
  {
    ssr: false,
  },
);

interface Props {
  name: string;
  textarea?: boolean;
  placeholder?: string;
}

export default function ArrayField({
  name,
  textarea,
  placeholder = '',
}: Props) {
  const { fields, update, append, remove, move } = useStringArray(name);
  const InputComponent = textarea ? Textarea : Input;

  const ids = fields.map((_, idx) => `${name}_${idx}`);

  return (
    <SortableList items={ids} onMove={move}>
      {fields.map((field, idx) => (
        <SortableItem key={`${name}_${idx}`} id={ids[idx]}>
          {({ listeners, attributes }) => (
            <div
              className={cn(
                'flex items-center gap-2',
                idx === fields.length - 1 && 'mb-6',
              )}
            >
              <Button
                type="button"
                size="icon-sm"
                variant="ghost"
                className="cursor-grab touch-none"
                {...listeners}
                {...attributes}
              >
                <GripVerticalIcon />
              </Button>
              <InputComponent
                className="resize-none"
                placeholder={placeholder}
                value={field}
                onChange={({ target }) => update(idx, target.value)}
              />
              <ConfirmDeleteButton onConfirm={() => remove(idx)} />
            </div>
          )}
        </SortableItem>
      ))}
      <Button
        className="w-full"
        variant="secondary"
        type="button"
        onClick={() => append('')}
      >
        <PlusIcon /> 항목 추가
      </Button>
    </SortableList>
  );
}
