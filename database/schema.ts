import { sql } from 'drizzle-orm';
import { pgTable, boolean, text, uuid } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text('username').notNull(),
  password: text('password').notNull(),
  name: text('name'),
  admin: boolean().default(false),
});
