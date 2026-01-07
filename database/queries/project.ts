import { and, count, desc, eq, ilike, or, sql } from 'drizzle-orm';

import { db } from '@/database';
import { fileTable } from '@/database/schema/file.schema';
import { projectTable } from '@/database/schema/project.schema';
import { techStackTable } from '@/database/schema/tech-stack.schema';
import { ProjectTable, type TechStackTable } from '@/database/types/project';
import type { DbClient } from '@/types/db';
import type { ImageFile, ProjectFilter } from '@/types/project';

const baseQuery = () =>
  db
    .select({
      id: projectTable.id,
      title: projectTable.title,
      isPublic: projectTable.isPublic,
      description: projectTable.description,
      category: projectTable.category,
      githubUrl: projectTable.githubUrl,
      applicationUrl: projectTable.applicationUrl,
      tags: projectTable.tags,
      overview: projectTable.overview,
      features: projectTable.features,
      goals: projectTable.goals,
      results: projectTable.results,
      member: projectTable.member,
      createdAt: projectTable.createdAt,
      updatedAt: projectTable.updatedAt,
      coverImage: sql<ImageFile | null>`
		CASE 
			WHEN ${projectTable.coverImageId} IS NULL THEN NULL
			ELSE JSON_BUILD_OBJECT('id', ${projectTable.coverImageId}, 'url', ${fileTable.url})
		END
		`.as('coverImage'),
      images: sql<ImageFile[]>`
		(
			SELECT JSON_AGG(JSON_BUILD_OBJECT('id', f.id, 'url', f.url))
			FROM ${fileTable} f
			WHERE f.id = ANY(${projectTable.imageIds})
		)`.as('images'),
      techStacks: sql<TechStackTable.Select[]>`
		COALESCE(
		  JSON_AGG(
				JSON_BUILD_OBJECT(
					'id', ${techStackTable.id},
					'projectId', ${techStackTable.projectId},
					'title', ${techStackTable.title},
					'stacks', ${techStackTable.stacks},
					'createdAt', ${techStackTable.createdAt},
					'updatedAt', ${techStackTable.updatedAt}
				)
			) FILTER (WHERE ${techStackTable.id} IS NOT NULL),
		  '[]'
		)`.as('techStacks'),
    })
    .from(projectTable)
    .leftJoin(fileTable, eq(projectTable.coverImageId, fileTable.id))
    .leftJoin(techStackTable, eq(projectTable.id, techStackTable.projectId))
    .groupBy(projectTable.id, fileTable.id, fileTable.url)
    .orderBy(desc(projectTable.createdAt));

export const getProjectsQuery = baseQuery().prepare('get_projects');
export const getProjectQuery = baseQuery()
  .where(eq(projectTable.id, sql.placeholder('projectId')))
  .prepare('get_project');
export const getPublicProjectsQuery = baseQuery()
  .where(eq(projectTable.isPublic, true))
  .prepare('get_public_projects');
export const getPublicProjectQuery = baseQuery()
  .where(
    and(
      eq(projectTable.id, sql.placeholder('projectId')),
      eq(projectTable.isPublic, true),
    ),
  )
  .prepare('get_public_project');
export const getProjectImageIds = db
  .select({
    coverImageId: projectTable.coverImageId,
    imageIds: projectTable.imageIds,
  })
  .from(projectTable)
  .where(eq(projectTable.id, sql.placeholder('projectId')));
export const getTotalProjectCountQuery = db
  .select({ count: count() })
  .from(projectTable)
  .prepare('get_total_project_count');
export const getFilteredProjectsQuery = (q: ProjectFilter['q']) => {
  const keyword = `%${q}%`;

  return baseQuery().where(
    and(
      eq(projectTable.isPublic, true),
      or(
        ilike(projectTable.title, keyword),
        ilike(projectTable.description, keyword),
        ilike(projectTable.category, keyword),
        ilike(sql`array_to_string(${techStackTable.stacks}, ',')`, keyword),
      ),
    ),
  );
};

export const insertProjectQuery = (
  values: ProjectTable.Insert,
  client: DbClient = db,
) => client.insert(projectTable).values(values);

export const updateProjectQuery = (
  values: Partial<ProjectTable.Insert>,
  client: DbClient = db,
) =>
  client
    .update(projectTable)
    .set(values)
    .where(eq(projectTable.id, sql.placeholder('projectId')));

export const deleteProjectQuery = (client: DbClient = db) =>
  client
    .delete(projectTable)
    .where(eq(projectTable.id, sql.placeholder('projectId')))
    .prepare('delete_project');
