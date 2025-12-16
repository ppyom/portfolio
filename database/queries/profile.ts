import { eq, sql } from 'drizzle-orm';
import { db } from '@/database';
import { profileTable } from '@/database/schemas/profile.schema';
import { experienceTable } from '@/database/schemas/experience.schema';
import { educationTable } from '@/database/schemas/education.schema';
import { EducationTable, ExperienceTable } from '@/database/types';

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

const baseQuery = db
  .select({
    id: profileTable.id,
    introduce: profileTable.introduce,
    createdAt: profileTable.createdAt,
    updatedAt: profileTable.updatedAt,
    language: profileTable.language,
    experience: experienceSubQuery.experience,
    education: educationSubQuery.education,
  })
  .from(profileTable)
  .leftJoin(
    experienceSubQuery,
    eq(profileTable.id, experienceSubQuery.profileId),
  )
  .leftJoin(
    educationSubQuery,
    eq(profileTable.id, educationSubQuery.profileId),
  );

export const getProfile = baseQuery
  .where(eq(profileTable.language, sql.placeholder('language')))
  .prepare('get_profile');
