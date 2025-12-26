import { sql } from 'drizzle-orm';
import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const skillCategoryTable = pgTable('skill_category', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  order: integer('order')
    .notNull()
    .$default(() => 0),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`NOW()`),
  updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
});
