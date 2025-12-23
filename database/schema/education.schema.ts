import { sql } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { profileTable } from './profile.schema';

export const educationTable = pgTable('education', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  profileId: uuid('profile_id').references(() => profileTable.id, {
    onDelete: 'cascade',
  }),
  name: text('name').notNull(),
  major: text('major').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`NOW()`),
  updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
});
