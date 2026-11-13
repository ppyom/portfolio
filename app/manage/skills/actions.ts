'use server';

import { revalidatePath } from 'next/cache';

import { updateSkillMetadata, updateSkills } from '@/services/skills';
import { extractErrorMessage } from '@/lib/utils/error';
import { revalidateVisitorPages } from '@/lib/utils/revalidate';
import type { SkillFormData, SkillMetadata } from '@/types/skill';

export const updateSkillsAction = async ({ skills }: SkillFormData) => {
  try {
    await updateSkills(skills);

    revalidatePath('/manage/skills');
    revalidateVisitorPages();

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

    // 스킬 색상은 방문자·관리자 루트 레이아웃(RootDocument)에서 읽으므로 둘 다 갱신한다
    revalidatePath('/manage', 'layout');
    revalidateVisitorPages();

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: extractErrorMessage(error),
    };
  }
};
