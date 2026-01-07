import { db } from '@/database';
import { deleteFiles, insertFiles } from '@/database/queries/file';
import {
  deleteProjectQuery,
  getFilteredProjectsQuery,
  getProjectImageIds,
  getProjectQuery,
  getProjectsQuery,
  getPublicProjectQuery,
  getPublicProjectsQuery,
  getTotalProjectCountQuery,
  insertProjectQuery,
  updateProjectQuery,
} from '@/database/queries/project';
import {
  deleteTechStack,
  insertTechStack,
} from '@/database/queries/tech-stack';
import { remove } from '@/lib/upload/file';
import { getDeletedImages, uploadImage } from '@/lib/upload/image';
import type { DbClient } from '@/types/db';
import type { Project, ProjectFilter, ProjectFormData } from '@/types/project';

interface Options {
  isPublic?: boolean;
}

const uploadAndInsertImages = async (
  project: Pick<ProjectFormData, 'coverImageFile' | 'imageFiles'>,
  client: DbClient,
) => {
  const coverImageUrls = (await uploadImage(project.coverImageFile)) ?? [];
  const imageUrls = (await uploadImage(project.imageFiles)) ?? [];

  const coverImage =
    coverImageUrls.length > 0
      ? await insertFiles(coverImageUrls, client).returning().execute()
      : [];

  const images =
    imageUrls.length > 0
      ? await insertFiles(imageUrls, client).returning().execute()
      : [];

  return {
    coverImageId: coverImage?.[0]?.id,
    imageIds: images.map((i) => i.id),
  };
};

export const getProjects = async ({ isPublic }: Options = {}): Promise<
  Project[]
> => {
  return (isPublic ? getPublicProjectsQuery : getProjectsQuery).execute();
};
export const getFilteredProjects = async ({ q }: ProjectFilter = {}): Promise<
  Project[]
> => (q ? getFilteredProjectsQuery(q) : getPublicProjectsQuery).execute();
export const getProject = async (
  id: string,
  { isPublic }: Options = {},
): Promise<Project> => {
  const [project] = await (
    isPublic ? getPublicProjectQuery : getProjectQuery
  ).execute({
    projectId: id,
  });
  return project;
};
export const getTotalProjectCount = async (): Promise<number> => {
  const [{ count }] = await getTotalProjectCountQuery.execute();
  return count;
};

export const createProject = async (project: ProjectFormData) => {
  return db.transaction(async (tx) => {
    const { coverImageId, imageIds } = await uploadAndInsertImages(project, tx);
    const [insertedProject] = await insertProjectQuery(
      {
        ...project,
        coverImageId,
        imageIds,
      },
      tx,
    )
      .returning()
      .execute();

    if (!insertedProject) {
      throw new Error('실패했습니다.');
    }

    if (project.techStacks.length > 0) {
      await insertTechStack(project.techStacks, tx).execute({
        projectId: insertedProject.id,
      });
    }

    return insertedProject;
  });
};

export const updateProject = async (id: string, project: ProjectFormData) => {
  const deletedImages = getDeletedImages(
    ...project.existedCoverImage,
    ...project.existedImages,
  );

  await db.transaction(async (tx) => {
    // 이미지 삭제
    await deleteFiles(
      deletedImages.map((i) => i.id),
      tx,
    ).execute();
    const remainingImageIds = project.existedImages
      .filter((i) => !i.deleted)
      .map((i) => i.id);

    const { coverImageId, imageIds } = await uploadAndInsertImages(project, tx);
    const [updatedProject] = await updateProjectQuery(
      {
        ...project,
        coverImageId:
          project.existedCoverImage?.[0]?.deleted === false
            ? undefined
            : (coverImageId ?? null),
        imageIds: [...remainingImageIds, ...imageIds],
      },
      tx,
    )
      .returning()
      .execute({ projectId: id });

    if (!updatedProject) {
      throw new Error('실패했습니다.');
    }

    if (project.techStacks.length > 0) {
      await insertTechStack(project.techStacks, tx).execute({ projectId: id });
    }
  });

  if (deletedImages.length !== 0) {
    await Promise.all(
      deletedImages.map(async (image) => await remove(image.url)),
    );
  }
};
export const updateProjectVisibility = async (
  id: string,
  isPublic: boolean,
) => {
  await updateProjectQuery({ isPublic }).execute({
    projectId: id,
  });
};

export const deleteProject = async (id: string) => {
  const [project] = await getProjectImageIds.execute({ projectId: id });

  const deletedImages = [
    project.coverImageId,
    ...(project.imageIds ?? []),
  ].filter((i): i is string => !!i);

  return db.transaction(async (tx) => {
    await deleteFiles(deletedImages, tx).execute();
    await deleteTechStack(tx).execute();
    await deleteProjectQuery(tx).execute({ projectId: id });
  });
};
