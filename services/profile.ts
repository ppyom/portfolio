import { db } from '@/database';
import {
  deleteEducationsQuery,
  insertEducationsQuery,
} from '@/database/queries/education';
import {
  deleteExperiencesQuery,
  insertExperiencesQuery,
} from '@/database/queries/experience';
import {
  deleteHistoriesQuery,
  insertHistoriesQuery,
} from '@/database/queries/history';
import {
  getLastProfileUpdateQuery,
  getProfileQuery,
  getResumeUrlQuery,
  insertProfileQuery,
  upsertResumeUrlQuery,
} from '@/database/queries/profile';
import { profileTable } from '@/database/schema/profile.schema';
import { resumeErrorMessages } from '@/lib/constants/error-messages';
import { remove } from '@/lib/upload/file';
import { uploadResume } from '@/lib/upload/resume';
import { profileMock } from '@/mocks/profile.mock';
import type { ProfileFormData } from '@/types/profile';

import { USE_MOCK } from './common';

export const getProfile = async (language = 'ko') => {
  if (USE_MOCK) return profileMock;
  const [profile] = await getProfileQuery.execute({ language });
  return profile;
};
export const getLastProfileUpdate = async (language = 'ko') => {
  if (USE_MOCK) return profileMock.updatedAt;
  const [profile] = await getLastProfileUpdateQuery.execute({ language });
  return profile.updatedAt;
};
export const getResumeUrl = async (language = 'ko') => {
  if (USE_MOCK) return profileMock.resumeUrl;
  const [profile] = await getResumeUrlQuery.execute({ language });
  return profile?.resumeUrl ?? null;
};

export const updateProfile = async (
  { introduce, experience, education, history }: ProfileFormData,
  language = 'ko',
) => {
  return await db.transaction(async (tx) => {
    const [profile] = await insertProfileQuery({ introduce }, tx)
      .returning({ id: profileTable.id })
      .execute({ language });

    await deleteExperiencesQuery(tx).execute({ profileId: profile.id });
    await deleteEducationsQuery(tx).execute({ profileId: profile.id });
    await deleteHistoriesQuery(tx).execute({ profileId: profile.id });

    if (experience.length > 0) {
      await insertExperiencesQuery(
        experience.map((e) => ({ ...e, profileId: profile.id })),
        tx,
      );
    }

    if (education.length > 0) {
      await insertEducationsQuery(
        education.map((e) => ({ ...e, profileId: profile.id })),
        tx,
      );
    }

    if (history.length > 0) {
      await insertHistoriesQuery(
        history.map((h, idx) => ({
          ...h,
          order: idx,
          profileId: profile.id,
        })),
        tx,
      );
    }

    return profile;
  });
};

export const updateResume = async (file: File, language = 'ko') => {
  const prevUrl = await getResumeUrl(language);
  const resumeUrl = await uploadResume(file);

  try {
    await upsertResumeUrlQuery(resumeUrl).execute({ language });
  } catch (error) {
    // DB 반영에 실패하면 방금 올린 파일이 고아가 되지 않도록 정리한다
    await remove(resumeUrl);
    throw error;
  }

  // 기존 파일 삭제 실패는 새 이력서 반영을 막을 이유가 없으므로 무시한다
  if (prevUrl) await remove(prevUrl).catch(() => undefined);

  return resumeUrl;
};

export const deleteResume = async (language = 'ko') => {
  const prevUrl = await getResumeUrl(language);
  if (!prevUrl) throw new Error(resumeErrorMessages.notFound);

  await upsertResumeUrlQuery(null).execute({ language });
  await remove(prevUrl).catch(() => undefined);
};
