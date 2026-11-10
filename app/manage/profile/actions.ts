'use server';

import { revalidatePath } from 'next/cache';

import { deleteResume, updateProfile, updateResume } from '@/services/profile';
import { extractErrorMessage } from '@/lib/utils/error';
import { schema as resumeSchema } from '@/lib/validation/resume.schema';
import type { ProfileFormData } from '@/types/profile';

export const updateProfileAction = async (data: ProfileFormData) => {
  try {
    await updateProfile(data);

    revalidatePath('/manage/profile');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};

// 이력서 버튼이 방문자 레이아웃(헤더)에 있으므로 공개 페이지 전체를 갱신한다
const revalidateResumePaths = () => {
  revalidatePath('/manage/profile');
  revalidatePath('/', 'layout');
};

export const uploadResumeAction = async (formData: FormData) => {
  const parsed = resumeSchema.safeParse({ file: formData.get('file') });

  if (!parsed.success) {
    return { success: false, message: parsed.error.issues[0].message };
  }

  try {
    await updateResume(parsed.data.file);

    revalidateResumePaths();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};

export const deleteResumeAction = async () => {
  try {
    await deleteResume();

    revalidateResumePaths();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};
