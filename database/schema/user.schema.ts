import { sql } from 'drizzle-orm';
import { boolean, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { policies } from '@/database/policies';

export const userTable = pgTable(
  'user',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    username: text('username').notNull(),
    password: text('password').notNull(),
    name: text('name'),
    admin: boolean().default(false),
  },
  () => [
    policies.allUser.read,
    policies.allUser.insert,
    policies.self.update('id'),
    ...policies.admin.all,
  ],
).enableRLS();
