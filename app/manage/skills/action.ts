'use server';

import { db } from '@/database';
import { skillTable } from '@/database/schema/skill.schema';
import { skillCategoryTable } from '@/database/schema/skill-category.schema';
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
    });

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
