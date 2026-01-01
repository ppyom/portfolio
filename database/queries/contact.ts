import { desc, eq } from 'drizzle-orm';

import { db } from '@/database';
import { contactTable } from '@/database/schema/contact.schema';

export const getInboxMessages = () =>
  db.select().from(contactTable).orderBy(desc(contactTable.createdAt));

export const getInboxMessage = (id: string) =>
  db
    .select()
    .from(contactTable)
    .where(eq(contactTable.id, id))
    .orderBy(desc(contactTable.createdAt));
