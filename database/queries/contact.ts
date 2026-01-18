import { and, asc, count, desc, eq, isNull, sql } from 'drizzle-orm';

import { db } from '@/database';
import { contactTable } from '@/database/schema/contact.schema';
import { ContactTable } from '@/database/types/contact';
import type { DbClient } from '@/types/db';

export const getInboxMessagesQuery = db
  .select()
  .from(contactTable)
  .where(isNull(contactTable.deletedAt))
  .orderBy(desc(contactTable.createdAt))
  .prepare('get_inbox_messages');
export const getInboxMessageQuery = db
  .select()
  .from(contactTable)
  .where(
    and(
      eq(contactTable.id, sql.placeholder('contactId')),
      isNull(contactTable.deletedAt),
    ),
  )
  .orderBy(desc(contactTable.createdAt))
  .prepare('get_inbox_message');
export const getUnreadMessageCountQuery = db
  .select({ count: count() })
  .from(contactTable)
  .where(eq(contactTable.status, 'unread'))
  .prepare('get_unread_message_count');
export const getRecentMessagesQuery = db
  .select()
  .from(contactTable)
  .where(isNull(contactTable.deletedAt))
  .orderBy(
    asc(sql`CASE WHEN ${contactTable.status} = 'unread' THEN 0 ELSE 1 END`),
    desc(contactTable.createdAt),
  );

export const insertContactQuery = (
  values: ContactTable.Insert,
  client: DbClient = db,
) => client.insert(contactTable).values(values);

export const updateContactQuery = (
  values: Partial<ContactTable.Insert>,
  client: DbClient = db,
) =>
  client
    .update(contactTable)
    .set(values)
    .where(eq(contactTable.id, sql.placeholder('contactId')));

export const removeContactQuery = (client: DbClient = db) =>
  client
    .update(contactTable)
    .set({ deletedAt: sql`now()` })
    .from(eq(contactTable.id, sql.placeholder('contactId')));
