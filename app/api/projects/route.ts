import { db } from '@/database';
import { projectTable, projectTechStackTable } from '@/database/schema';
import { getProjects } from '@/database/queries/project';
import { uploadImage } from '@/lib/image';
import type { Project } from '@/types/project';

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
  const formData = await request.formData();

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const category = formData.get('category') as string;
  const githubUrl = formData.get('githubUrl') as string;
  const applicationUrl = formData.get('applicationUrl') as string;
  const tags: Project['tags'] = JSON.parse(formData.get('tags') as string);
  const overview = formData.get('overview') as string;
  const features: Project['features'] = JSON.parse(
    formData.get('features') as string,
  );
  const goals: Project['goals'] = JSON.parse(formData.get('goals') as string);
  const results: Project['results'] = JSON.parse(
    formData.get('results') as string,
  );
  const member: Project['member'] = JSON.parse(
    formData.get('member') as string,
  );
  const techStacks: Project['techStacks'] = JSON.parse(
    formData.get('techStacks') as string,
  );
  const coverImageFile = formData.getAll('coverImageFile') as File[];
  const imagesFile = formData.getAll('imagesFile') as File[];

  try {
    const result = await db.transaction(async (tx) => {
      const coverImage =
        coverImageFile.length !== 0 && (await uploadImage(coverImageFile, tx));
      const images =
        imagesFile.length !== 0 && (await uploadImage(imagesFile, tx));

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
          coverImageId: coverImage ? coverImage[0].id : undefined,
          imageIds: images ? images.map((image) => image.id) : undefined,
        })
        .returning();
      const project = inserted[0];

      if (!project) {
        throw new Error('실패했습니다.');
      }

      if (techStacks.length > 0) {
        const insertedTechStacks = await tx
          .insert(projectTechStackTable)
          .values(techStacks.map((t) => ({ ...t, projectId: project.id })));
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
