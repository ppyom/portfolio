import { sql } from 'drizzle-orm';
import { pgPolicy } from 'drizzle-orm/pg-core';

export const policies = {
  admin: {
    all: [
      pgPolicy('insert_admin', {
        as: 'permissive',
        to: 'public',
        for: 'insert',
        using: sql`EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)`,
        withCheck: sql`EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE)`,
      }),
      pgPolicy('update_admin', {
        as: 'permissive',
        to: 'public',
        for: 'update',
        using: sql`EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)`,
        withCheck: sql`EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE)`,
      }),
      pgPolicy('delete_admin', {
        as: 'permissive',
        to: 'public',
        for: 'delete',
        using: sql`EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND admin = TRUE)`,
        withCheck: sql`EXISTS (SELECT 1 FROM user WHERE id = auth.uid() AND  admin = TRUE)`,
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
      using: sql`true`,
      withCheck: sql`true`,
    }),
  },
  self: {
    insert: (col: string = 'id') =>
      pgPolicy('insert_self', {
        as: 'permissive',
        to: 'public',
        for: 'insert',
        using: sql`${col} = auth.uid()`,
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
