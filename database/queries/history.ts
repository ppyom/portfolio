import { eq, sql } from 'drizzle-orm';

import { db } from '@/database';
import { historyTable } from '@/database/schema/history.schema';
import { HistoryTable } from '@/database/types/profile';
import type { DbClient } from '@/types/db';

export const getLearningsQuery = () =>
  db.select().from(historyTable).where(eq(historyTable.type, 'learning'));

export const getCertificationsQuery = () =>
  db.select().from(historyTable).where(eq(historyTable.type, 'certification'));

export const insertHistoriesQuery = (
  histories: HistoryTable.Insert[],
  client: DbClient = db,
) => client.insert(historyTable).values(histories);

export const deleteHistoriesQuery = (client: DbClient = db) =>
  client
    .delete(historyTable)
    .where(eq(historyTable.profileId, sql.placeholder('profileId')));
