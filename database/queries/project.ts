import { and, desc, eq, ilike, or, sql } from 'drizzle-orm';

import { db } from '@/database';
import { fileTable } from '@/database/schema/file.schema';
import { projectTable } from '@/database/schema/project.schema';
import { techStackTable } from '@/database/schema/tech-stack.schema';
import type { TechStackTable } from '@/database/types/project';
import type { ImageFile, ProjectFilter } from '@/types/project';

const baseQuery = db
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

export const getProjects = () => baseQuery.execute();
export const getProject = (projectId: string) =>
  baseQuery.where(eq(projectTable.id, projectId)).execute();

export const getPublicProjects = () =>
  baseQuery.where(eq(projectTable.isPublic, true)).execute();
export const getPublicProject = (projectId: string) =>
  baseQuery
    .where(and(eq(projectTable.id, projectId), eq(projectTable.isPublic, true)))
    .execute();

export const getFilteredProjects = (q: ProjectFilter['q']) => {
  if (!q) {
    return getPublicProjects();
  }

  const keyword = `%${q}%`;

  return baseQuery
    .where(
      and(
        eq(projectTable.isPublic, true),
        or(
          ilike(projectTable.title, keyword),
          ilike(projectTable.description, keyword),
          ilike(projectTable.category, keyword),
          ilike(sql`array_to_string(${techStackTable.stacks}, ',')`, keyword),
        ),
      ),
    )
    .execute();
};
