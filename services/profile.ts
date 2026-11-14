import { hasLocale } from 'next-intl';

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
import {
  profileErrorMessages,
  resumeErrorMessages,
} from '@/lib/constants/error-messages';
import { remove } from '@/lib/upload/file';
import { uploadResume } from '@/lib/upload/resume';
import { type Locale, routing } from '@/i18n/routing';
import { profileMock, profileMocks } from '@/mocks/profile.mock';
import type { Profile, ProfileFormData } from '@/types/profile';

import { USE_MOCK } from './common';

const { defaultLocale } = routing;

// Server Action에서 받은 임의 문자열이 언어 행으로 저장되지 않도록 막는다
const assertSupportedLanguage: (
  language: string,
) => asserts language is Locale = (language) => {
  if (!hasLocale(routing.locales, language)) {
    throw new Error(profileErrorMessages.invalidLanguage);
  }
};

/**
 * 관리자 편집용. 해당 언어 프로필 원본을 그대로 반환하고, 없으면 undefined
 */
export const getProfile = async (
  language: Locale = defaultLocale,
): Promise<Profile | undefined> => {
  if (USE_MOCK) return profileMocks.find((p) => p.language === language);
  const [profile] = await getProfileQuery.execute({ language });
  return profile;
};
/**
 * 방문자용. 해당 언어 프로필이 없으면 한국어 프로필로 대체한다
 */
export const getPublicProfile = async (
  language: Locale = defaultLocale,
): Promise<Profile | undefined> => {
  const profile = await getProfile(language);
  if (profile || language === defaultLocale) return profile;
  return getProfile(defaultLocale);
};
export const getLastProfileUpdate = async (
  language: Locale = defaultLocale,
) => {
  if (USE_MOCK) return profileMock.updatedAt;
  const [profile] = await getLastProfileUpdateQuery.execute({ language });
  return profile.updatedAt;
};
const getOwnResumeUrl = async (language: Locale) => {
  if (USE_MOCK) {
    return profileMocks.find((p) => p.language === language)?.resumeUrl ?? null;
  }
  const [profile] = await getResumeUrlQuery.execute({ language });
  return profile?.resumeUrl ?? null;
};
/**
 * 방문자용. 해당 언어 이력서가 없으면 한국어 이력서로 대체한다
 * 프로필은 있어도 이력서만 안 올린 언어에서 이력서 버튼이 사라지지 않게 하기 위함
 */
export const getResumeUrl = async (language: Locale = defaultLocale) => {
  const resumeUrl = await getOwnResumeUrl(language);
  if (resumeUrl || language === defaultLocale) return resumeUrl;
  return getOwnResumeUrl(defaultLocale);
};

export const updateProfile = async (
  { introduce, experience, education, history }: ProfileFormData,
  language: string,
) => {
  assertSupportedLanguage(language);
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

export const updateResume = async (file: File, language: string) => {
  assertSupportedLanguage(language);
  const prevUrl = await getOwnResumeUrl(language);
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

export const deleteResume = async (language: string) => {
  assertSupportedLanguage(language);
  const prevUrl = await getOwnResumeUrl(language);
  if (!prevUrl) throw new Error(resumeErrorMessages.notFound);

  await upsertResumeUrlQuery(null).execute({ language });
  await remove(prevUrl).catch(() => undefined);
};
