import { sql } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { unique } from 'drizzle-orm/pg-core/unique-constraint';

import { projectTable } from './project.schema';

export const techStackTable = pgTable(
  'project_tech_stack',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projectTable.id, { onDelete: 'cascade' }),
    title: text('title'),
    stacks: text('stacks').array(),
    createdAt: text('created_at')
      .notNull()
      .$default(() => sql`NOW()`),
    updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
  },
  (table) => ({
    project_tech_stack_projectId_title_unique: unique().on(
      table.projectId,
      table.title,
    ),
  }),
);
