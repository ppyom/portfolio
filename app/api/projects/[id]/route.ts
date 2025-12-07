import { projectSchema } from '@/lib/validation/project.schema';
import { db } from '@/database';
import { projectTable, projectTechStackTable } from '@/database/schema';
import { eq, sql } from 'drizzle-orm';

interface Payload {
  params: Promise<{ id: string }>;
}

export const PATCH = async (request: Request, { params }: Payload) => {
  const { id } = await params;
  const body = await request.json();

  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(parsed.error.format(), { status: 400 });
  }

  const {
    title,
    description,
    category,
    coverImageUrl,
    githubUrl,
    applicationUrl,
    tags,
    overview,
    features,
    images,
    goals,
    results,
    member,
    techStacks,
  } = parsed.data;

  try {
    const result = await db.transaction(async (tx) => {
      const inserted = await tx
        .update(projectTable)
        .set({
          title,
          description,
          category,
          coverImageUrl,
          githubUrl,
          applicationUrl,
          tags,
          overview,
          features,
          images,
          goals,
          results,
          member,
        })
        .where(eq(projectTable.id, id))
        .returning();
      const project = inserted[0];

      if (!project) {
        throw new Error('실패했습니다.');
      }

      if (techStacks.length > 0) {
        const insertedTechStacks = await tx
          .insert(projectTechStackTable)
          .values(techStacks.map((t) => ({ projectId: project.id, ...t })))
          .onConflictDoUpdate({
            target: [
              projectTechStackTable.projectId,
              projectTechStackTable.title,
            ],
            set: {
              stacks: sql`excluded.stacks`,
            },
          });
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
