'use server';

import { revalidatePath } from 'next/cache';

import { createContact } from '@/services/contact';
import { FormDataType } from '@/lib/validation/contact.schema';

export const sendContactAction = async (data: FormDataType) => {
  try {
    await createContact(data);

    revalidatePath('/manage/contact');

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
