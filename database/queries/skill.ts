import { eq, sql } from 'drizzle-orm';

import { db } from '@/database';
import { skillTable } from '@/database/schema/skill.schema';
import { skillCategoryTable } from '@/database/schema/skill-category.schema';

const baseQuery = db
  .select({
    category: skillCategoryTable.name,
    items: sql<string[]>`ARRAY_AGG(${skillTable.name})`,
  })
  .from(skillTable)
  .leftJoin(
    skillCategoryTable,
    eq(skillCategoryTable.id, skillTable.categoryId),
  )
  .groupBy(skillCategoryTable.name, skillCategoryTable.order)
  .orderBy(skillCategoryTable.order);

export const getSkills = baseQuery.prepare('get_skills');
