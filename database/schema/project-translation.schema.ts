import { sql } from 'drizzle-orm';
import { pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { jsonb } from 'drizzle-orm/pg-core/columns/jsonb';
import { unique } from 'drizzle-orm/pg-core/unique-constraint';

import { policies } from '@/database/policies';

import { projectTable } from './project.schema';

// 한국어(기본 언어)는 project 테이블에 두고, 그 외 언어만 여기에 저장한다.
// 번역 컬럼이 비어 있으면 한국어 값을 쓰므로 모두 nullable이다.
export const projectTranslationTable = pgTable(
  'project_translation',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projectTable.id, { onDelete: 'cascade' }),
    language: text('language').notNull(),
    title: text('title'),
    description: text('description'),
    category: text('category'),
    overview: text('overview'),
    features: text('features').array(),
    goals: text('goals').array(),
    results: text('results').array(),
    // 인원 수(size)는 언어와 무관하므로 한국어 원본 값을 쓴다
    member: jsonb('member').$type<{
      role: string;
      responsibilities: string[];
    }>(),
    createdAt: text('created_at')
      .notNull()
      .$default(() => sql`NOW()`),
    updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
  },
  (table) => [
    unique().on(table.projectId, table.language),
    policies.allUser.read,
    ...policies.admin.all,
  ],
).enableRLS();
