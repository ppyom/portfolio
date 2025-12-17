import { sql } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { unique } from 'drizzle-orm/pg-core/unique-constraint';

export const profileTable = pgTable(
  'profile',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    language: text('language').notNull().default('ko'),
    introduce: text('introduce').array(),
    createdAt: text('created_at')
      .notNull()
      .$default(() => sql`NOW()`),
    updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
  },
  (table) => ({
    profile_language_unique: unique().on(table.language),
  }),
);
