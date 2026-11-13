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
  // password가 있고 API로 admin 계정을 만들 수 있으므로 공개 읽기·쓰기 정책을 두지 않는다
  () => [...policies.admin.all],
).enableRLS();
