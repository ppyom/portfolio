'use server';

import { revalidatePath } from 'next/cache';

import { createContact } from '@/services/contact';
import { commonErrorMessages } from '@/lib/constants/error-messages';
import { extractErrorMessage } from '@/lib/utils/error';
import { FormDataType } from '@/lib/validation/contact.schema';

export const sendContactAction = async (data: FormDataType) => {
  try {
    await createContact(data);

    revalidatePath('/manage/contact');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(
        error,
        commonErrorMessages.retry('메시지 전송에 실패했습니다.'),
      ),
    };
  }
};
