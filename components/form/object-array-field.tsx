'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { Fragment } from 'react';

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
  return (
    <>
      {fields.map((field, idx) => (
        <div key={field.fieldId} className="flex items-center gap-2">
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
          <div className="flex items-center gap-1">
            <div className="flex flex-col">
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => move(idx, idx - 1)}
                disabled={idx === 0}
              >
                <ArrowUpIcon />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                onClick={() => move(idx, idx + 1)}
                disabled={idx === fields.length - 1}
              >
                <ArrowDownIcon />
              </Button>
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
        </div>
      ))}
      <Button
        className="w-full"
        variant="secondary"
        type="button"
        onClick={() => append({})}
      >
        <PlusIcon /> {title} 추가
      </Button>
    </>
  );
}
