'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/database';
import { skillTable } from '@/database/schema/skill.schema';
import { skillCategoryTable } from '@/database/schema/skill-category.schema';
import { skillMetadataTable } from '@/database/schema/skill-metadata.schema';
import type { FormDataType } from '@/components/admin/skills/skill-edit-form';

export const updateSkillsAction = async ({ skills }: FormDataType) => {
  try {
    const result = await db.transaction(async (tx) => {
      await tx.delete(skillTable);
      await tx.delete(skillCategoryTable);

      for (let i = 0; i < skills.length; i++) {
        const skill = skills[i];

        const [insertedCategory] = await tx
          .insert(skillCategoryTable)
          .values({
            name: skill.category,
            order: i,
          })
          .returning({ id: skillCategoryTable.id });

        await tx.insert(skillTable).values(
          skill.items.map((item) => ({
            name: item,
            categoryId: insertedCategory.id,
          })),
        );
      }

      return true;
    });

    revalidatePath('/manage/skills');

    return { success: true, projectId: result };
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

export const updateSkillMetadata = async ({
  items,
}: {
  items: {
    name: string;
    color: string;
  }[];
}) => {
  try {
    const result = await db.transaction(async (tx) => {
      await tx.delete(skillMetadataTable);

      await tx
        .insert(skillMetadataTable)
        .values(items.map((item) => ({ name: item.name, color: item.color })));

      return true;
    });

    revalidatePath('/(application)/(main-page)');

    return { success: true, projectId: result };
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
