'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/database';
import { contactTable } from '@/database/schema/contact.schema';
import { FormDataType } from '@/lib/validation/contact.schema';

export const sendContactAction = async (data: FormDataType) => {
  try {
    const result = await db
      .insert(contactTable)
      .values({
        ...data,
      })
      .returning({ id: contactTable.id });

    revalidatePath('/manage/contact');

    return { success: true, projectId: result };
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
