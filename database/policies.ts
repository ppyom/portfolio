import { sql } from 'drizzle-orm';
import { pgPolicy } from 'drizzle-orm/pg-core';

// Postgres는 INSERT 정책에 WITH CHECK만, DELETE 정책에 USING만 허용한다 (섞으면 CREATE POLICY 실패)
// user는 예약어라 따옴표가 없으면 테이블이 아니라 현재 롤 이름으로 해석된다
const isAdmin = sql`EXISTS (SELECT 1 FROM "user" WHERE id = auth.uid() AND admin = TRUE)`;

export const policies = {
  admin: {
    all: [
      pgPolicy('insert_admin', {
        as: 'permissive',
        to: 'public',
        for: 'insert',
        withCheck: isAdmin,
      }),
      pgPolicy('update_admin', {
        as: 'permissive',
        to: 'public',
        for: 'update',
        using: isAdmin,
        withCheck: isAdmin,
      }),
      pgPolicy('delete_admin', {
        as: 'permissive',
        to: 'public',
        for: 'delete',
        using: isAdmin,
      }),
    ],
  },
  allUser: {
    read: pgPolicy('read_all', {
      as: 'permissive',
      to: 'public',
      for: 'select',
      using: sql`true`,
    }),
    insert: pgPolicy('insert_all', {
      as: 'permissive',
      to: 'public',
      for: 'insert',
      withCheck: sql`true`,
    }),
  },
  self: {
    insert: (col: string = 'id') =>
      pgPolicy('insert_self', {
        as: 'permissive',
        to: 'public',
        for: 'insert',
        withCheck: sql`${col} = auth.uid()`,
      }),
    update: (col: string = 'id') =>
      pgPolicy('update_self', {
        as: 'permissive',
        to: 'public',
        for: 'update',
        using: sql`${col} = auth.uid()`,
        withCheck: sql`${col} = auth.uid()`,
      }),
  },
};
