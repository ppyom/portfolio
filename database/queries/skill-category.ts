import { db } from '@/database';
import { skillCategoryTable } from '@/database/schema/skill-category.schema';
import { SkillCategoryTable } from '@/database/types/skill';
import type { DbClient } from '@/types/db';

export const insertSkillCategoryQuery = (
  category: SkillCategoryTable.Insert,
  client: DbClient = db,
) => client.insert(skillCategoryTable).values(category);

export const deleteSkillCategoriesQuery = (client: DbClient = db) =>
  client.delete(skillCategoryTable);
