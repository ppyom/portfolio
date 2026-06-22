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
import { contactMock } from '@/mocks/contact.mock';
import type { InboxMessage } from '@/types/inbox-message';

import { USE_MOCK } from './common';

export const getInboxMessages = async () => {
  if (USE_MOCK) return contactMock;
  return getInboxMessagesQuery.execute();
};
export const getInboxMessage = async (id: string) => {
  if (USE_MOCK) return contactMock[0];
  try {
    const [message] = await getInboxMessageQuery.execute({ contactId: id });
    return message;
  } catch {
    return null;
  }
};
export const getUnreadMessageCount = async () => {
  if (USE_MOCK) return contactMock.filter((m) => m.status === 'unread').length;
  const [message] = await getUnreadMessageCountQuery.execute();
  return message.count;
};
export const getRecentMessages = async (limit: number = 5) => {
  if (USE_MOCK) return contactMock.slice(0, limit);
  return getRecentMessagesQuery.limit(limit).execute();
};

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
