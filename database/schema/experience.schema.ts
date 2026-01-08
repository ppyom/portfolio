import { sql } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { policies } from '@/database/policies';

import { profileTable } from './profile.schema';

export const experienceTable = pgTable(
  'experience',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    profileId: uuid('profile_id').references(() => profileTable.id, {
      onDelete: 'cascade',
    }),
    name: text('name'),
    position: text('position').notNull(),
    startDate: text('start_date').notNull(),
    endDate: text('end_date'),
    description: text('description'),
    createdAt: text('created_at')
      .notNull()
      .$default(() => sql`NOW()`),
    updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
  },
  () => [policies.allUser.read, ...policies.admin.all],
).enableRLS();
