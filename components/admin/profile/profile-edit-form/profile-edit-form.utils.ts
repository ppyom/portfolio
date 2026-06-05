import { createStringItems, toStringArray } from '@/lib/utils/form';
import type { FormDataType } from '@/lib/validation/profile.schema';
import type { Profile } from '@/types/profile';

export function createProfilePayload(data: FormDataType) {
  return {
    ...data,

    introduce: toStringArray(data.introduce),
  };
}

export function createProfileDefaultValues(profile?: Profile): FormDataType {
  return {
    introduce: createStringItems(profile?.introduce),
    experience: (profile?.experience ?? []).map((item) => ({
      name: item.name ?? '',
      position: item.position ?? '',
      startDate: item.startDate ?? '',
      endDate: item.endDate ?? '',
    })),
    education: (profile?.education ?? []).map((item) => ({
      name: item.name ?? '',
      major: item.major ?? '',
      startDate: item.startDate ?? '',
      endDate: item.endDate ?? '',
    })),
    history: (profile?.history ?? []).map((item) => ({
      name: item.name ?? '',
      type: item.type ?? '',
      date: item.date ?? '',
      description: item.description ?? '',
    })),
  };
}
