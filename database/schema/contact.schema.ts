import { sql } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const contactStatusEnum = pgEnum('contact_status', [
  'unread',
  'read',
  'completed',
]);

export const contactTable = pgTable('contact', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  status: contactStatusEnum('status').$default(() => 'unread'),
  title: text('title').notNull(),
  content: text('content').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`NOW()`),
  updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
});
