import { projectSchema } from '@/lib/validation/project.schema';
import { db } from '@/database';
import { projectTable, projectTechStackTable } from '@/database/schema';
import { eq, sql } from 'drizzle-orm';

interface Payload {
  params: Promise<{ id: string }>;
}

export const PATCH = async (request: Request, { params }: Payload) => {
  const { id } = await params;

  if (!id) {
    Response.json('존재하지 않는 프로젝트입니다.', { status: 404 });
  }

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
  const existedCoverImage = JSON.parse(
    formData.get('existedCoverImage') as string,
  );
  const existedImages = JSON.parse(formData.get('existedImages') as string);

  console.log(
    'title',
    title,
    'description',
    description,
    'category',
    category,
    'githubUrl',
    githubUrl,
    'applicationUrl',
    applicationUrl,
    'tags',
    tags,
    'overview',
    overview,
    'features',
    features,
    'goals',
    goals,
    'results',
    results,
    'member',
    member,
    'techStacks',
    techStacks,
    'coverImageFile',
    coverImageFile,
    'imagesFile',
    imagesFile,
    'existedCoverImage',
    existedCoverImage,
    'existedImages',
    existedImages,
  );

  try {
    const result = await db.transaction(async (tx) => {
      // 0. TODO 이미지파일 업데이트 (삭제 여부 O => 삭제)

      // 1. 이미지 업로드
      const coverImage =
        coverImageFile.length !== 0 && (await uploadImage(coverImageFile, tx));
      const images =
        imagesFile.length !== 0 && (await uploadImage(imagesFile, tx));

      // 2. 작성
      const inserted = await tx
        .update(projectTable)
        .set({
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
        .where(eq(projectTable.id, id))
        .returning();
      const project = inserted[0];

      if (!project) {
        throw new Error('실패했습니다.');
      }

      if (techStacks.length > 0) {
        const insertedTechStacks = await tx
          .insert(projectTechStackTable)
          .values(techStacks.map((t) => ({ ...t, projectId: id })))
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
