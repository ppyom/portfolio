import { eq, sql } from 'drizzle-orm';

import { db } from '@/database';
import { experienceTable } from '@/database/schema/experience.schema';
import { ExperienceTable } from '@/database/types/profile';
import type { DbClient } from '@/types/db';

export const insertExperiencesQuery = (
  experiences: ExperienceTable.Insert[],
  client: DbClient = db,
) => client.insert(experienceTable).values(experiences);

export const deleteExperiencesQuery = (client: DbClient) =>
  client
    .delete(experienceTable)
    .where(eq(experienceTable.profileId, sql.placeholder('profileId')));
