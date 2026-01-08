import { sql } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { unique } from 'drizzle-orm/pg-core/unique-constraint';

import { policies } from '@/database/policies';

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
  (table) => [
    unique().on(table.language),
    policies.allUser.read,
    ...policies.admin.all,
  ],
).enableRLS();
