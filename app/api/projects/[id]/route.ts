import { eq, sql } from 'drizzle-orm';
import { inArray } from 'drizzle-orm/sql/expressions/conditions';
import { db } from '@/database';
import {
  fileTable,
  projectTable,
  projectTechStackTable,
} from '@/database/schema';
import { getDeletedImages, uploadImage } from '@/lib/image';
import type { ImageFile, Project } from '@/types/project';
import { remove } from '@/lib/file-uploader';
import { parseProjectFormData } from '@/lib/utils/parseProjectFormData';

interface Payload {
  params: Promise<{ id: string }>;
}

export const PATCH = async (request: Request, { params }: Payload) => {
  const { id } = await params;

  if (!id) {
    Response.json('존재하지 않는 프로젝트입니다.', { status: 404 });
  }

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
    imagesFile,
    existedCoverImage,
    existedImages,
  } = parseProjectFormData(formData);

  const deletedImages = getDeletedImages(
    ...existedCoverImage,
    ...existedImages,
  );

  try {
    const result = await db
      .transaction(async (tx) => {
        // 0. 이미지파일 업데이트 (삭제할 파일들 삭제)
        await tx.delete(fileTable).where(
          inArray(
            fileTable.id,
            deletedImages.map((i) => i.id),
          ),
        );
        const remainingImageIds = existedImages
          .filter((i) => !i.deleted)
          .map((i) => i.id);

        // 1. 이미지 업로드
        const coverImage = await uploadImage(coverImageFile, tx);
        const images = (await uploadImage(imagesFile, tx)) || [];

        // 2. 작성
        const updated = await tx
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
            coverImageId: !existedCoverImage?.[0].deleted
              ? undefined
              : coverImage?.[0].id || null,
            imageIds: [...remainingImageIds, ...images.map((i) => i.id)],
          })
          .where(eq(projectTable.id, id))
          .returning();
        const project = updated[0];

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
      })
      .finally(async () => {
        if (deletedImages.length === 0) return;

        await Promise.all(
          deletedImages.map(async (image) => await remove(image.url)),
        );
      });

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return Response.json(error.message, { status: 400 });
    }
  }
};
