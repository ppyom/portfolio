'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useStringArray } from '@/hooks/use-string-array';
import { Textarea } from '@/components/ui/textarea';

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
  const { fields, update, append, remove } = useStringArray(name);
  const InputComponent = textarea ? Textarea : Input;

  return (
    <>
      {fields.map((field, idx) => (
        <div key={`${name}_${idx}`} className="flex items-center gap-2">
          <InputComponent
            className="resize-none"
            placeholder={placeholder}
            value={field}
            onChange={({ target }) => update(idx, target.value)}
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            onClick={() => remove(idx)}
          >
            <Trash2Icon />
          </Button>
        </div>
      ))}
      <Button
        className="w-full"
        variant="secondary"
        type="button"
        onClick={() => append('')}
      >
        <PlusIcon /> 항목 추가
      </Button>
    </>
  );
}
