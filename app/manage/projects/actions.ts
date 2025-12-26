'use server';

import { revalidatePath } from 'next/cache';
import { eq, sql } from 'drizzle-orm';
import { inArray } from 'drizzle-orm/sql/expressions/conditions';

import { db } from '@/database';
import { fileTable } from '@/database/schema/file.schema';
import { projectTable } from '@/database/schema/project.schema';
import { techStackTable } from '@/database/schema/tech-stack.schema';
import { remove } from '@/lib/upload/file';
import { getDeletedImages, uploadImage } from '@/lib/upload/image';
import { parseProjectFormData } from '@/lib/utils/parse-project-form-data';

export async function createProjectAction(formData: FormData) {
  const {
    title,
    isPublic,
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
          isPublic,
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
          .insert(techStackTable)
          .values(techStacks.map((t) => ({ ...t, projectId: project.id })));
        if (!insertedTechStacks) {
          throw new Error('실패했습니다.');
        }
      }

      return project;
    });

    revalidatePath('/manage/projects');
    revalidatePath('/projects');

    return { success: true, projectId: result.id };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function updateProjectAction(formData: FormData, id: string) {
  if (!id) {
    return { success: false, message: '존재하지 않는 프로젝트입니다.' };
  }

  const {
    title,
    isPublic,
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
    existedCoverImage,
    existedImages,
  } = parseProjectFormData(formData);

  const deletedImages = getDeletedImages(
    ...existedCoverImage,
    ...existedImages,
  );

  try {
    const result = await db.transaction(async (tx) => {
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
      const images = (await uploadImage(imageFiles, tx)) || [];

      // 2. 작성
      const updated = await tx
        .update(projectTable)
        .set({
          title,
          isPublic,
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
          coverImageId:
            existedCoverImage?.[0]?.deleted === false
              ? undefined
              : coverImage?.[0]?.id || null,
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
          .insert(techStackTable)
          .values(techStacks.map((t) => ({ ...t, projectId: id })))
          .onConflictDoUpdate({
            target: [techStackTable.projectId, techStackTable.title],
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

    if (deletedImages.length !== 0) {
      await Promise.all(
        deletedImages.map(async (image) => await remove(image.url)),
      );
    }

    revalidatePath('/manage/projects');
    revalidatePath(`/projects/${id}`);

    return { success: true, projectId: result.id };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
    };
  }
}

export async function deleteProject(id: string) {
  const [project] = await db
    .select({
      coverImageId: projectTable.coverImageId,
      imageIds: projectTable.imageIds,
    })
    .from(projectTable)
    .where(eq(projectTable.id, id));

  const deletedImages = [
    project.coverImageId,
    ...(project.imageIds ?? []),
  ].filter((i): i is string => !!i);

  try {
    await db.transaction(async (tx) => {
      // 1. 프로젝트에 적용된 이미지파일 삭제
      await tx.delete(fileTable).where(inArray(fileTable.id, deletedImages));

      // 2. 프로젝트 기술스택 삭제
      await tx.delete(techStackTable).where(eq(techStackTable.projectId, id));

      // 3. 프로젝트 삭제
      return tx.delete(projectTable).where(eq(projectTable.id, id)).returning();
    });

    revalidatePath('/manage/projects');
    revalidatePath('/projects');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다.',
    };
  }
}
