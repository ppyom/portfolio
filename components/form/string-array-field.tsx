'use client';

import { useFormContext } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { DragHandle } from '@/components/ui/draggable-list';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DeleteButton, DeleteDialog } from '@/components/delete';

import { FieldArray } from './field-array';

interface Props {
  name: string;
  placeholder?: string;
  textarea?: boolean;
}

export function StringArrayField({ name, placeholder, textarea }: Props) {
  const { register } = useFormContext();
  const InputComponent = textarea ? Textarea : Input;

  return (
    <FieldArray
      name={name}
      createItem={() => ({ id: crypto.randomUUID(), value: '' })}
    >
      {({ index, remove }) => (
        <div className={cn('flex gap-2', !textarea && 'items-center')}>
          <DragHandle className={cn(textarea && 'mt-2')} />
          <InputComponent
            className="flex-1"
            placeholder={placeholder}
            {...register(`${name}.${index}.value`)}
          />
          <DeleteDialog onConfirm={remove}>
            <DeleteButton />
          </DeleteDialog>
        </div>
      )}
    </FieldArray>
  );
}
