import { inArray } from 'drizzle-orm/sql/expressions/conditions';

import { db } from '@/database';
import { fileTable } from '@/database/schema/file.schema';
import { FileTable } from '@/database/types/project';
import type { DbClient } from '@/types/db';

export const insertFiles = (files: FileTable.Insert[], client: DbClient = db) =>
  client.insert(fileTable).values(files);
export const deleteFiles = (fileIds: string[], client: DbClient = db) =>
  client.delete(fileTable).where(inArray(fileTable.id, fileIds));
