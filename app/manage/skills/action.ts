'use server';

import { revalidatePath } from 'next/cache';

import { updateSkillMetadata, updateSkills } from '@/services/skills';
import type { FormDataType } from '@/lib/validation/skill.schema';
import type { SkillMetadata } from '@/types/skill';

export const updateSkillsAction = async ({ skills }: FormDataType) => {
  try {
    await updateSkills(skills);

    revalidatePath('/manage/skills');

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
};

export const updateSkillMetadataAction = async ({
  items,
}: {
  items: SkillMetadata[];
}) => {
  try {
    await updateSkillMetadata(
      items.map((item) => ({ name: item.name, color: item.color })),
    );

    revalidatePath('/');

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
};
