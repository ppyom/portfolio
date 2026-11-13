'use server';

import { revalidatePath } from 'next/cache';
import { hasLocale } from 'next-intl';

import { deleteResume, updateProfile, updateResume } from '@/services/profile';
import { extractErrorMessage } from '@/lib/utils/error';
import { schema as resumeSchema } from '@/lib/validation/resume.schema';
import { getPathname } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import type { ProfileFormData } from '@/types/profile';

// 다른 언어는 프로필이 없으면 한국어로 대체하므로, 한국어가 바뀌면 모든 언어 페이지를 갱신한다
const getAffectedLocales = (language: string): readonly Locale[] => {
  if (language === routing.defaultLocale) return routing.locales;
  return hasLocale(routing.locales, language) ? [language] : [];
};

const revalidateProfilePaths = (language: string) => {
  revalidatePath('/manage/profile');
  for (const locale of getAffectedLocales(language)) {
    revalidatePath(getPathname({ href: '/', locale }));
    revalidatePath(getPathname({ href: '/about', locale }));
  }
};

// 이력서 버튼이 방문자 레이아웃(헤더)에 있으므로 언어별 공개 페이지 전체를 갱신한다
const revalidateResumePaths = (language: string) => {
  revalidatePath('/manage/profile');
  for (const locale of getAffectedLocales(language)) {
    revalidatePath(getPathname({ href: '/', locale }), 'layout');
  }
};

export const updateProfileAction = async (
  data: ProfileFormData,
  language: string,
) => {
  try {
    await updateProfile(data, language);

    revalidateProfilePaths(language);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};

export const uploadResumeAction = async (
  formData: FormData,
  language: string,
) => {
  const parsed = resumeSchema.safeParse({ file: formData.get('file') });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  try {
    await updateResume(parsed.data.file, language);

    revalidateResumePaths(language);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};

export const deleteResumeAction = async (language: string) => {
  try {
    await deleteResume(language);

    revalidateResumePaths(language);

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};
