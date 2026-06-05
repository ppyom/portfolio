import type { StringItem } from '@/lib/validation/common.schema';

export function toStringArray(items: StringItem[]) {
  return items.map((item) => item.value);
}
