import { type projectTable, projectTechStackTable } from '@/database/schema';

export namespace ProjectTable {
  type Select = typeof projectTable.$inferSelect;
  type Insert = typeof projectTable.$inferInsert;
}

export namespace TechStackTable {
  type Select = typeof projectTechStackTable.$inferSelect;
  type Insert = typeof projectTechStackTable.$inferInsert;
}
