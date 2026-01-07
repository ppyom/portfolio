import { eq, sql } from 'drizzle-orm';

import { db } from '@/database';
import { educationTable } from '@/database/schema/education.schema';
import { EducationTable } from '@/database/types/profile';
import type { DbClient } from '@/types/db';

export const insertEducationsQuery = (
  educations: EducationTable.Insert[],
  client: DbClient = db,
) => client.insert(educationTable).values(educations);

export const deleteEducationsQuery = (client: DbClient) =>
  client
    .delete(educationTable)
    .where(eq(educationTable.profileId, sql.placeholder('profileId')));
