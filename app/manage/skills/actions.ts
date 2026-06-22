'use server';

import { revalidatePath } from 'next/cache';

import { updateSkillMetadata, updateSkills } from '@/services/skills';
import { extractErrorMessage } from '@/lib/utils/error';
import type { SkillFormData, SkillMetadata } from '@/types/skill';

export const updateSkillsAction = async ({ skills }: SkillFormData) => {
  try {
    await updateSkills(skills);

    revalidatePath('/manage/skills');

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
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
      message: extractErrorMessage(error),
    };
  }
};
