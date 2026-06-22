import type { StringItem } from '@/lib/validation/common.schema';

export function createStringItems(
  values: string[] | null | undefined,
): StringItem[] {
  if (!values) return [];

  return values.map((value) => ({
    id: crypto.randomUUID(),
    value,
  }));
}
