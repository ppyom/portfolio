'use server';

import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';

import { db } from '@/database';
import { contactTable } from '@/database/schema/contact.schema';
import type { InboxMessage } from '@/types/inbox-message';

export const updateStatusAction = async (
  id: string,
  status: InboxMessage['status'],
) => {
  try {
    await db
      .update(contactTable)
      .set({
        status,
      })
      .where(eq(contactTable.id, id));

    revalidatePath('/manage/inbox');

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
