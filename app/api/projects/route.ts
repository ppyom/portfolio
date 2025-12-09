import { db } from '@/database';
import { projectTable, projectTechStackTable } from '@/database/schema';
import { getProjects } from '@/database/queries/project';
import { projectSchema } from '@/lib/validation/project.schema';

export const GET = async () => {
  try {
    const projects = await getProjects.execute();
    return Response.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json('데이터 처리 중 오류가 발생했습니다.', {
      status: 400,
    });
  }
};

export const POST = async (request: Request) => {
  const body = await request.json();

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(parsed.error.format(), { status: 400 });
  }

  const {
    title,
    description,
    category,
    githubUrl,
    applicationUrl,
    tags,
    overview,
    features,
    goals,
    results,
    member,
    techStacks,
  } = parsed.data;

  try {
    const result = await db.transaction(async (tx) => {
      const inserted = await tx
        .insert(projectTable)
        .values({
          title,
          description,
          category,
          githubUrl,
          applicationUrl,
          tags,
          overview,
          features,
          goals,
          results,
          member,
        })
        .returning();
      const project = inserted[0];

      if (!project) {
        throw new Error('실패했습니다.');
      }

      if (techStacks.length > 0) {
        const insertedTechStacks = await tx
          .insert(projectTechStackTable)
          .values(techStacks.map((t) => ({ projectId: project.id, ...t })));
        if (!insertedTechStacks) {
          throw new Error('실패했습니다.');
        }
      }

      return project;
    });

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return Response.json(error.message, { status: 400 });
    }
  }
};
