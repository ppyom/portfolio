import { sql } from 'drizzle-orm';
import { boolean, integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { jsonb } from 'drizzle-orm/pg-core/columns/jsonb';

import { policies } from '@/database/policies';

import { fileTable } from './file.schema';

export const projectTable = pgTable(
  'project',
  {
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
      onDelete: 'set null',
    }),
    imageIds: uuid('image_ids')
      .references(() => fileTable.id, {
        onDelete: 'set null',
      })
      .array(),
    isPublic: boolean('is_public').$default(() => true),
    order: integer('order').$default(() => 0),
    createdAt: text('created_at')
      .notNull()
      .$default(() => sql`NOW()`),
    updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
  },
  () => [policies.allUser.read, ...policies.admin.all],
).enableRLS();
