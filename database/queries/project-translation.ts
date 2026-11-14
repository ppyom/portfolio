import { and, eq, sql } from 'drizzle-orm';

import { db } from '@/database';
import { projectTranslationTable } from '@/database/schema/project-translation.schema';
import type { ProjectTranslationTable } from '@/database/types/project';
import type { DbClient } from '@/types/db';

export const getProjectTranslationsQuery = db
  .select()
  .from(projectTranslationTable)
  .where(eq(projectTranslationTable.language, sql.placeholder('language')))
  .prepare('get_project_translations');

export const getProjectTranslationQuery = db
  .select()
  .from(projectTranslationTable)
  .where(
    and(
      eq(projectTranslationTable.projectId, sql.placeholder('projectId')),
      eq(projectTranslationTable.language, sql.placeholder('language')),
    ),
  )
  .prepare('get_project_translation');

export const upsertProjectTranslationQuery = (
  values: ProjectTranslationTable.Insert,
  client: DbClient = db,
) =>
  client
    .insert(projectTranslationTable)
    .values(values)
    .onConflictDoUpdate({
      target: [
        projectTranslationTable.projectId,
        projectTranslationTable.language,
      ],
      set: {
        title: sql`excluded.title`,
        description: sql`excluded.description`,
        category: sql`excluded.category`,
        overview: sql`excluded.overview`,
        features: sql`excluded.features`,
        goals: sql`excluded.goals`,
        results: sql`excluded.results`,
        member: sql`excluded.member`,
        updatedAt: sql`NOW()`,
      },
    });

export const deleteProjectTranslationQuery = (client: DbClient = db) =>
  client
    .delete(projectTranslationTable)
    .where(
      and(
        eq(projectTranslationTable.projectId, sql.placeholder('projectId')),
        eq(projectTranslationTable.language, sql.placeholder('language')),
      ),
    );
