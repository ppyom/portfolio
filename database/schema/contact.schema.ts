import { sql } from 'drizzle-orm';
import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';

import { policies } from '@/database/policies';

export const contactStatusEnum = pgEnum('contact_status', [
  'unread',
  'read',
  'completed',
]);

export const contactTable = pgTable(
  'contact',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    status: contactStatusEnum('status')
      .$default(() => 'unread')
      .notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    company: text('company'),
    name: text('name').notNull(),
    email: text('email').notNull(),
    createdAt: text('created_at')
      .notNull()
      .$default(() => sql`NOW()`),
    updatedAt: text('updated_at').$onUpdate(() => sql`NOW()`),
    deletedAt: text('deleted_at'),
  },
  // 방문자 개인정보가 있고 문의 저장은 Server Action이 처리하므로 공개 정책을 두지 않는다
  () => [...policies.admin.all],
).enableRLS();
