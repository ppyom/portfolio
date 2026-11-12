'use server';

import { revalidatePath } from 'next/cache';
import { getTranslations } from 'next-intl/server';

import { createContact } from '@/services/contact';
import { extractErrorMessage } from '@/lib/utils/error';
import { FormDataType } from '@/lib/validation/contact.schema';

export const sendContactAction = async (data: FormDataType) => {
  try {
    await createContact(data);

    revalidatePath('/manage/contact');

    return { success: true };
  } catch (error) {
    const t = await getTranslations('ContactForm');

    return {
      success: false,
      message: extractErrorMessage(error, t('failure')),
    };
  }
};
