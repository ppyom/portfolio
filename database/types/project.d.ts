import { fileTable } from '@/database/schema/file.schema';
import { projectTable } from '@/database/schema/project.schema';
import { projectTranslationTable } from '@/database/schema/project-translation.schema';
import { techStackTable } from '@/database/schema/tech-stack.schema';

export namespace FileTable {
  type Select = typeof fileTable.$inferSelect;
  type Insert = typeof fileTable.$inferInsert;
}

export namespace ProjectTable {
  type Select = typeof projectTable.$inferSelect;
  type Insert = typeof projectTable.$inferInsert;
}

export namespace ProjectTranslationTable {
  type Select = typeof projectTranslationTable.$inferSelect;
  type Insert = typeof projectTranslationTable.$inferInsert;
}

export namespace TechStackTable {
  type Select = typeof techStackTable.$inferSelect;
  type Insert = typeof techStackTable.$inferInsert;
}
