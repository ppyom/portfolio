import { pgTable, boolean, text, uuid } from 'drizzle-orm/pg-core';

export const userTable = pgTable('user', {
  id: uuid('id').primaryKey(),
  username: text('username').notNull(),
  password: text('password').notNull(),
  name: text('name'),
  admin: boolean().default(false),
});
