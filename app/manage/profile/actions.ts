'use server';

import { revalidatePath } from 'next/cache';

import { updateProfile } from '@/services/profile';
import type { FormDataType } from '@/lib/validation/profile.schema';

export const updateProfileAction = async (data: FormDataType) => {
  try {
    await updateProfile(data);

    revalidatePath('/manage/profile');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
    };
  }
};
