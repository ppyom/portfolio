'use client';

import { GripVerticalIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useStringArray } from '@/hooks/use-string-array';
import { cn } from '@/lib/utils';
import SortableList from '@/components/form/sortable/list';
import SortableItem from '@/components/form/sortable/item';

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
                className="cursor-grab"
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
