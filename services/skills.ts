import { db } from '@/database';
import {
  deleteSkillsQuery,
  getLastSkillUpdateQuery,
  getSkillsQuery,
  insertSkillsQuery,
} from '@/database/queries/skill';
import {
  deleteSkillCategoriesQuery,
  insertSkillCategoryQuery,
} from '@/database/queries/skill-category';
import {
  deleteSkillMetadataQuery,
  getSkillMetadataQuery,
  insertSkillMetadataQuery,
} from '@/database/queries/skill-metadata';
import { skillCategoryTable } from '@/database/schema/skill-category.schema';
import type { Skill, SkillMetadata } from '@/types/skill';

export const getSkills = async () => getSkillsQuery.execute();
export const getSkillMetadata = async () => {
  const rows = await getSkillMetadataQuery.execute();
  return Object.fromEntries(
    rows.map(({ name, color }) => [name, { name, color }]),
  ) as Record<string, SkillMetadata>;
};
export const getLastSkillUpdate = async () => {
  const [skill] = await getLastSkillUpdateQuery.execute();
  return skill.updatedAt;
};

export const updateSkills = async (skills: Skill[]) => {
  return await db.transaction(async (tx) => {
    await deleteSkillsQuery(tx);
    await deleteSkillCategoriesQuery(tx);

    for (let i = 0; i < skills.length; i++) {
      const skill = skills[i];

      if (!skill.category) {
        throw new Error('카테고리 이름을 입력해주세요.');
      }

      const [insertedCategory] = await insertSkillCategoryQuery(
        { name: skill.category, order: i },
        tx,
      ).returning({ id: skillCategoryTable.id });

      await insertSkillsQuery(
        skill.items.map((item) => ({
          name: item,
          categoryId: insertedCategory.id,
        })),
        tx,
      );
    }
  });
};
export const updateSkillMetadata = async (metadata: SkillMetadata[]) => {
  return await db.transaction(async (tx) => {
    await deleteSkillMetadataQuery(tx);
    await insertSkillMetadataQuery(metadata, tx);
    return true;
  });
};
