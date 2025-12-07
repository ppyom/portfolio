import { desc, eq, sql } from 'drizzle-orm';
import { db } from '@/database';
import { projectTable, projectTechStackTable } from '@/database/schema';

const baseQuery = db
  .select({
    id: projectTable.id,
    title: projectTable.title,
    description: projectTable.description,
    category: projectTable.category,
    coverImageUrl: projectTable.coverImageUrl,
    githubUrl: projectTable.githubUrl,
    applicationUrl: projectTable.applicationUrl,
    tags: projectTable.tags,
    overview: projectTable.overview,
    features: projectTable.features,
    images: projectTable.images,
    goals: projectTable.goals,
    results: projectTable.results,
    member: projectTable.member,
    createdAt: projectTable.createdAt,
    updatedAt: projectTable.updatedAt,
    techStacks: sql<(typeof projectTechStackTable.$inferSelect)[]>`
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
  .leftJoin(
    projectTechStackTable,
    eq(projectTable.id, projectTechStackTable.projectId),
  )
  .groupBy(projectTable.id)
  .orderBy(desc(projectTable.createdAt));

export const getProjects = baseQuery.prepare('get_projects');
export const getProject = baseQuery
  .where(eq(projectTable.id, sql.placeholder('projectId')))
  .prepare('get_post');
