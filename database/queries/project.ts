import { desc, eq, sql } from 'drizzle-orm';
import { db } from '@/database';
import {
  fileTable,
  projectTable,
  projectTechStackTable,
} from '@/database/schema';
import { TechStackTable } from '@/database/types';
import type { ImageFile } from '@/types/project';

const baseQuery = db
  .select({
    id: projectTable.id,
    title: projectTable.title,
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
					'id', ${projectTechStackTable.id},
					'projectId', ${projectTechStackTable.projectId},
					'title', ${projectTechStackTable.title},
					'stacks', ${projectTechStackTable.stacks},
					'createdAt', ${projectTechStackTable.createdAt},
					'updatedAt', ${projectTechStackTable.updatedAt}
				)
			) FILTER (WHERE ${projectTechStackTable.id} IS NOT NULL),
		  '[]'
		)`.as('techStacks'),
  })
  .from(projectTable)
  .leftJoin(fileTable, eq(projectTable.coverImageId, fileTable.id))
  .leftJoin(
    projectTechStackTable,
    eq(projectTable.id, projectTechStackTable.projectId),
  )
  .groupBy(projectTable.id, fileTable.id, fileTable.url)
  .orderBy(desc(projectTable.createdAt));

export const getProjects = baseQuery.prepare('get_projects');
export const getProject = baseQuery
  .where(eq(projectTable.id, sql.placeholder('projectId')))
  .prepare('get_post');
