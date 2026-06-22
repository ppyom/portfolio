'use server';

import { revalidatePath } from 'next/cache';

import { updateProfile } from '@/services/profile';
import { extractErrorMessage } from '@/lib/utils/error';
import type { ProfileFormData } from '@/types/profile';

export const updateProfileAction = async (data: ProfileFormData) => {
  try {
    await updateProfile(data);

    revalidatePath('/manage/profile');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};
