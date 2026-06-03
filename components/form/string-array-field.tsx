'use client';

import { useFormContext } from 'react-hook-form';
import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DragHandle } from '@/components/ui/draggable-list';
import { Input } from '@/components/ui/input';

import { FieldArray } from './field-array';

interface Props {
  name: string;
  placeholder?: string;
}

export function StringArrayField({ name, placeholder }: Props) {
  const { register } = useFormContext();

  return (
    <FieldArray
      name={name}
      createItem={() => ({ id: crypto.randomUUID(), value: '' })}
    >
      {({ index, remove }) => (
        <div className="flex items-center gap-2">
          <DragHandle />
          <Input
            className="flex-1"
            placeholder={placeholder}
            {...register(`${name}.${index}.value`)}
          />
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
