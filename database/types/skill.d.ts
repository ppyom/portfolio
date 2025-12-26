import { skillTable } from '@/database/schema/skill.schema';
import { skillCategoryTable } from '@/database/schema/skill-category.schema';
import { skillMetadataTable } from '@/database/schema/skill-metadata.schema';

export namespace SkillCategoryTable {
  type Select = typeof skillCategoryTable.$inferSelect;
  type Insert = typeof skillCategoryTable.$inferInsert;
}

export namespace SkillTable {
  type Select = typeof skillTable.$inferSelect;
  type Insert = typeof skillTable.$inferInsert;
}

export namespace SkillMetadataTable {
  type Select = typeof skillMetadataTable.$inferSelect;
  type Insert = typeof skillMetadataTable.$inferInsert;
}
