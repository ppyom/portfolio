import { and, asc, count, desc, eq, isNull, sql } from 'drizzle-orm';

import { db } from '@/database';
import { contactTable } from '@/database/schema/contact.schema';

export const getInboxMessages = () =>
  db
    .select()
    .from(contactTable)
    .where(isNull(contactTable.deletedAt))
    .orderBy(desc(contactTable.createdAt));

export const getInboxMessage = (id: string) =>
  db
    .select()
    .from(contactTable)
    .where(and(eq(contactTable.id, id), isNull(contactTable.deletedAt)))
    .orderBy(desc(contactTable.createdAt));

export const getUnreadMessageCount = () =>
  db
    .select({ count: count() })
    .from(contactTable)
    .where(eq(contactTable.status, 'unread'));

export const getRecentMessages = (limit: number = 5) =>
  db
    .select()
    .from(contactTable)
    .where(isNull(contactTable.deletedAt))
    .orderBy(
      asc(sql`CASE WHEN ${contactTable.status} = 'unread' THEN 0 ELSE 1 END`),
      desc(contactTable.createdAt),
    )
    .limit(limit);
