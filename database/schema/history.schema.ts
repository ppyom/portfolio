import { sql } from 'drizzle-orm';
import { integer, pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { profileTable } from './profile.schema';

export const historyTypeEnum = pgEnum('history_type', [
  'learning',
  'certification',
  'activity',
]);

export const historyTable = pgTable('history', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  profileId: uuid('profile_id').references(() => profileTable.id, {
    onDelete: 'cascade',
  }),
  type: historyTypeEnum('type').notNull(),
  name: text('name').notNull(),
  date: text('date'),
  description: text('description'),
  order: integer('order')
    .notNull()
    .$default(() => 0),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`NOW()`),
  updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
});
