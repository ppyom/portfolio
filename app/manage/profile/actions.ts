'use server';

import { revalidatePath } from 'next/cache';

import { deleteResume, updateProfile, updateResume } from '@/services/profile';
import { extractErrorMessage } from '@/lib/utils/error';
import { revalidateVisitorPages } from '@/lib/utils/revalidate';
import { schema as resumeSchema } from '@/lib/validation/resume.schema';
import type { ProfileFormData } from '@/types/profile';

// 다른 언어는 프로필·이력서가 없으면 한국어로 대체하고 이력서 버튼은 헤더에 있으므로, 방문자 페이지 전체를 갱신한다
const revalidateProfilePaths = () => {
  revalidatePath('/manage/profile');
  revalidateVisitorPages();
};

export const updateProfileAction = async (
  data: ProfileFormData,
  language: string,
) => {
  try {
    await updateProfile(data, language);

    revalidateProfilePaths();

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

    revalidateProfilePaths();

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

    revalidateProfilePaths();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};
