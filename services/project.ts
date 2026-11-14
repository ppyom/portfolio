import { hasLocale } from 'next-intl';

import { db } from '@/database';
import { deleteFiles, insertFiles } from '@/database/queries/file';
import {
  deleteProjectQuery,
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
  deleteProjectTranslationQuery,
  getProjectTranslationQuery,
  getProjectTranslationsQuery,
  upsertProjectTranslationQuery,
} from '@/database/queries/project-translation';
import {
  deleteTechStack,
  insertTechStack,
} from '@/database/queries/tech-stack';
import { projectErrorMessages } from '@/lib/constants/error-messages';
import { remove } from '@/lib/upload/file';
import { getDeletedImages, uploadImage } from '@/lib/upload/image';
import { applyProjectTranslation } from '@/lib/utils/project-translation';
import { type Locale, routing } from '@/i18n/routing';
import { projectMock, projectTranslationMock } from '@/mocks/project.mock';
import type { DbClient } from '@/types/db';
import type {
  Project,
  ProjectFormData,
  ProjectTranslation,
  ProjectTranslationData,
} from '@/types/project';

import { USE_MOCK } from './common';

interface Options {
  isPublic?: boolean;
  language?: Locale;
}

const getTranslationsByLanguage = async (
  language: Locale,
): Promise<ProjectTranslation[]> => {
  if (USE_MOCK) {
    return projectTranslationMock.filter((t) => t.language === language);
  }
  return getProjectTranslationsQuery.execute({ language });
};

// 기본 언어(한국어)는 project 테이블 값이 곧 원본이라 번역을 조회하지 않는다
const translateProjects = async (
  projects: Project[],
  language: Locale = routing.defaultLocale,
): Promise<Project[]> => {
  if (language === routing.defaultLocale || projects.length === 0) {
    return projects;
  }

  const translations = await getTranslationsByLanguage(language);
  const translationMap = new Map(translations.map((t) => [t.projectId, t]));

  return projects.map((project) =>
    applyProjectTranslation(project, translationMap.get(project.id)),
  );
};

// 번역은 기본 언어가 아닌 지원 언어로만 저장한다 (Server Action에서 받은 임의 문자열 방어)
const assertTranslatableLanguage: (
  language: string,
) => asserts language is Locale = (language) => {
  if (
    !hasLocale(routing.locales, language) ||
    language === routing.defaultLocale
  ) {
    throw new Error(projectErrorMessages.translation.invalidLanguage);
  }
};

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

export const getProjects = async ({
  isPublic,
  language,
}: Options = {}): Promise<Project[]> => {
  if (USE_MOCK) return translateProjects(projectMock, language);
  const projects = await (
    isPublic ? getPublicProjectsQuery : getProjectsQuery
  ).execute();
  return translateProjects(projects, language);
};
export const getProject = async (
  id: string,
  { isPublic, language }: Options = {},
): Promise<Project | null> => {
  if (USE_MOCK) {
    const [project] = await translateProjects([projectMock[0]], language);
    return project;
  }
  try {
    const [project] = await (
      isPublic ? getPublicProjectQuery : getProjectQuery
    ).execute({
      projectId: id,
    });
    if (!project) return null;

    const [translated] = await translateProjects([project], language);
    return translated;
  } catch {
    return null;
  }
};
/**
 * 관리자 편집 폼은 덮어쓰기 결과가 아니라 입력한 번역 원본이 필요해서 따로 조회한다
 */
export const getProjectTranslation = async (
  id: string,
  language: string,
): Promise<ProjectTranslation | null> => {
  assertTranslatableLanguage(language);
  if (USE_MOCK) {
    return (
      projectTranslationMock.find(
        (t) => t.projectId === id && t.language === language,
      ) ?? null
    );
  }
  const [translation] = await getProjectTranslationQuery.execute({
    projectId: id,
    language,
  });
  return translation ?? null;
};
export const getTotalProjectCount = async (): Promise<number> => {
  if (USE_MOCK) return projectMock.length;
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
    ...project.coverImage,
    ...project.images,
  );

  await db.transaction(async (tx) => {
    // 이미지 삭제
    await deleteFiles(
      deletedImages.map((i) => i.id),
      tx,
    ).execute();
    const remainingImageIds = project.images
      .filter((i) => !i.deleted)
      .map((i) => i.id);

    const { coverImageId, imageIds } = await uploadAndInsertImages(project, tx);
    const [updatedProject] = await updateProjectQuery(
      {
        ...project,
        coverImageId:
          project.coverImage?.[0]?.deleted === false
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

    await deleteTechStack(tx).execute({
      projectId: id,
    });

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
export const updateProjectOrder = async (projectIds: string[]) => {
  await db.transaction(async (tx) => {
    await Promise.all(
      projectIds.map((id, idx) =>
        updateProjectQuery({ order: idx }, tx).execute({ projectId: id }),
      ),
    );
  });
};

export const saveProjectTranslation = async (
  id: string,
  language: string,
  data: ProjectTranslationData,
) => {
  assertTranslatableLanguage(language);
  await upsertProjectTranslationQuery({
    ...data,
    projectId: id,
    language,
  }).execute();
};
export const deleteProjectTranslation = async (
  id: string,
  language: string,
) => {
  assertTranslatableLanguage(language);
  await deleteProjectTranslationQuery().execute({ projectId: id, language });
};

export const deleteProject = async (id: string) => {
  const [project] = await getProjectImageIds.execute({ projectId: id });

  const deletedImages = [
    project.coverImageId,
    ...(project.imageIds ?? []),
  ].filter((i): i is string => !!i);

  return db.transaction(async (tx) => {
    await deleteFiles(deletedImages, tx).execute();
    await deleteTechStack(tx).execute({ projectId: id });
    await deleteProjectQuery(tx).execute({ projectId: id });
  });
};
