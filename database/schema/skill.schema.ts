import { sql } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { skillCategoryTable } from '@/database/schema/skill-category.schema';

export const skillTable = pgTable('skill', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text('name').notNull(),
  categoryId: uuid('category_id')
    .notNull()
    .references(() => skillCategoryTable.id, { onDelete: 'cascade' }),
  description: text('description'),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`NOW()`),
  updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
});
