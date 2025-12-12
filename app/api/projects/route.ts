import { db } from '@/database';
import { projectTable, projectTechStackTable } from '@/database/schema';
import { getProjects } from '@/database/queries/project';
import { uploadImage } from '@/lib/image';
import type { Project } from '@/types/project';
import { parseProjectFormData } from '@/lib/utils/parseProjectFormData';

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
    coverImageFile,
    imageFiles,
  } = parseProjectFormData(formData);

  try {
    const result = await db.transaction(async (tx) => {
      const coverImage =
        coverImageFile.length !== 0 && (await uploadImage(coverImageFile, tx));
      const images =
        imageFiles.length !== 0 && (await uploadImage(imageFiles, tx));

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
