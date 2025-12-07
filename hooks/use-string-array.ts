import { useWatch, useFormContext } from 'react-hook-form';

export function useStringArray(name: string) {
  const { setValue, getValues } = useFormContext();
  const items = useWatch({ name }) as string[];

  const append = (value: string) => {
    setValue(name, [...items, value], { shouldValidate: true });
  };

  const remove = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    setValue(name, next, { shouldValidate: true });
  };

  const update = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    setValue(name, next, { shouldValidate: true });
  };

  const insert = (index: number, value: string) => {
    const next = [...items];
    next.splice(index, 0, value);
    setValue(name, next, { shouldValidate: true });
  };

  return {
    fields: items,
    append,
    remove,
    update,
    insert,
  };
}
