import { sql } from 'drizzle-orm';
import { pgTable, boolean, text, uuid } from 'drizzle-orm/pg-core';
import { jsonb } from 'drizzle-orm/pg-core/columns/jsonb';
import { unique } from 'drizzle-orm/pg-core/unique-constraint';

export const fileTable = pgTable('file', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  url: text('url').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`NOW()`),
  updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
});

export const userTable = pgTable('user', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  username: text('username').notNull(),
  password: text('password').notNull(),
  name: text('name'),
  admin: boolean().default(false),
});

export const projectTable = pgTable('project', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category'),
  githubUrl: text('github_url'),
  applicationUrl: text('application_url'),
  tags: text('tags').array(),
  overview: text('overview'),
  features: text('features').array(),
  goals: text('goals').array(),
  results: text('results').array(),
  member: jsonb('member').$type<{
    size: number;
    role: string;
    responsibilities: string[];
  }>(),
  coverImageId: uuid('cover_image_id').references(() => fileTable.id, {
    onDelete: 'cascade',
  }),
  imageIds: uuid('image_ids')
    .references(() => fileTable.id, {
      onDelete: 'cascade',
    })
    .array(),
  createdAt: text('created_at')
    .notNull()
    .$default(() => sql`NOW()`),
  updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
});

export const projectTechStackTable = pgTable(
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
