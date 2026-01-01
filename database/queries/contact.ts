import { desc, eq } from 'drizzle-orm';

import { db } from '@/database';
import { contactTable } from '@/database/schema/contact.schema';

export const getContacts = () =>
  db.select().from(contactTable).orderBy(desc(contactTable.createdAt));

export const getContact = (id: string) =>
  db
    .select()
    .from(contactTable)
    .where(eq(contactTable.id, id))
    .orderBy(desc(contactTable.createdAt));
