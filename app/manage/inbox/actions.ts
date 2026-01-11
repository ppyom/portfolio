'use server';

import { revalidatePath } from 'next/cache';

import { deleteContact, updateContactStatus } from '@/services/contact';
import { extractErrorMessage } from '@/lib/utils/error';
import type { InboxMessage } from '@/types/inbox-message';

export const updateStatusAction = async (
  id: string,
  status: InboxMessage['status'],
) => {
  try {
    await updateContactStatus(id, status);

    revalidatePath('/manage/inbox');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};

export const deleteMessage = async (id: string) => {
  try {
    await deleteContact(id);

    revalidatePath('/manage/inbox');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};
