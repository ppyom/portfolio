import { eq, sql } from 'drizzle-orm';

import { db } from '@/database';
import { educationTable } from '@/database/schema/education.schema';
import { experienceTable } from '@/database/schema/experience.schema';
import { historyTable } from '@/database/schema/history.schema';
import { profileTable } from '@/database/schema/profile.schema';
import {
  EducationTable,
  ExperienceTable,
  HistoryTable,
  ProfileTable,
} from '@/database/types/profile';
import type { DbClient } from '@/types/db';

const experienceSubQuery = db
  .select({
    profileId: experienceTable.profileId,
    experience: sql<ExperienceTable.Select[]>`
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ${experienceTable.id},
            'name', ${experienceTable.name},
            'position', ${experienceTable.position},
            'startDate', ${experienceTable.startDate},
            'endDate', ${experienceTable.endDate}
          )
        ),
        '[]'
      )
    `.as('experience'),
  })
  .from(experienceTable)
  .groupBy(experienceTable.profileId)
  .as('experience');

const educationSubQuery = db
  .select({
    profileId: educationTable.profileId,
    education: sql<EducationTable.Select[]>`
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ${educationTable.id},
            'name', ${educationTable.name},
            'major', ${educationTable.major},
            'startDate', ${educationTable.startDate},
            'endDate', ${educationTable.endDate}
          )
        ),
        '[]'
      )
    `.as('education'),
  })
  .from(educationTable)
  .groupBy(educationTable.profileId)
  .as('education');

const historySubQuery = db
  .select({
    profileId: historyTable.profileId,
    history: sql<HistoryTable.Select[]>`
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ${historyTable.id},
            'name', ${historyTable.name},
            'type', ${historyTable.type},
            'date', ${historyTable.date},
            'description', ${historyTable.description},
            'order', ${historyTable.order}
          )
        ),
        '[]' 
      )
      `.as('history'),
  })
  .from(historyTable)
  .groupBy(historyTable.profileId)
  .as('history');

const baseQuery = db
  .select({
    id: profileTable.id,
    introduce: profileTable.introduce,
    createdAt: profileTable.createdAt,
    updatedAt: profileTable.updatedAt,
    language: profileTable.language,
    experience: experienceSubQuery.experience,
    education: educationSubQuery.education,
    history: historySubQuery.history,
  })
  .from(profileTable)
  .leftJoin(
    experienceSubQuery,
    eq(profileTable.id, experienceSubQuery.profileId),
  )
  .leftJoin(educationSubQuery, eq(profileTable.id, educationSubQuery.profileId))
  .leftJoin(historySubQuery, eq(profileTable.id, historySubQuery.profileId));

export const getProfileQuery = baseQuery
  .where(eq(profileTable.language, sql.placeholder('language')))
  .prepare('get_profile');
export const getLastProfileUpdateQuery = db
  .select({ updatedAt: profileTable.updatedAt })
  .from(profileTable)
  .where(eq(profileTable.language, sql.placeholder('language')))
  .prepare('get_profile_update');

export const insertProfileQuery = (
  values: ProfileTable.Insert,
  client: DbClient = db,
) =>
  client
    .insert(profileTable)
    .values({ ...values, language: sql.placeholder('language') })
    .onConflictDoUpdate({
      target: profileTable.language,
      set: {
        ...values,
      },
    });
