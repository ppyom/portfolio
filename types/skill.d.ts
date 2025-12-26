import { SkillCategoryTable, SkillTable } from '@/database/types/skill';

export interface Skill {
  category: SkillCategoryTable.Select['name'] | null;
  items: SkillTable.Select['name'][];
}

export interface SkillMetadata {
  color: string;
}
