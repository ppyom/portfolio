import {
  getInboxMessageQuery,
  getInboxMessagesQuery,
  getRecentMessagesQuery,
  getUnreadMessageCountQuery,
  insertContactQuery,
  removeContactQuery,
  updateContactQuery,
} from '@/database/queries/contact';
import { FormDataType } from '@/lib/validation/contact.schema';
import type { InboxMessage } from '@/types/inbox-message';

export const getInboxMessages = async () => getInboxMessagesQuery.execute();
export const getInboxMessage = async (id: string) => {
  try {
    const [message] = await getInboxMessageQuery.execute({ contactId: id });
    return message;
  } catch {
    return null;
  }
};
export const getUnreadMessageCount = async () => {
  const [message] = await getUnreadMessageCountQuery.execute();
  return message.count;
};
export const getRecentMessages = async (limit: number = 5) =>
  getRecentMessagesQuery.limit(limit).execute();

export const createContact = async (values: FormDataType) => {
  await insertContactQuery(values);
};

export const updateContactStatus = async (
  id: string,
  status: InboxMessage['status'],
) => {
  await updateContactQuery({ status }).execute({ contactId: id });
};

export const deleteContact = async (id: string) => {
  await removeContactQuery().execute({ contactId: id });
};
