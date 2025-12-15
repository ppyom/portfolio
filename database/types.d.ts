import { fileTable, projectTable, techStackTable } from '@/database/schema';

export namespace FileTable {
  type Select = typeof fileTable.$inferSelect;
  type Insert = typeof fileTable.$inferInsert;
}

export namespace ProjectTable {
  type Select = typeof projectTable.$inferSelect;
  type Insert = typeof projectTable.$inferInsert;
}

export namespace TechStackTable {
  type Select = typeof techStackTable.$inferSelect;
  type Insert = typeof techStackTable.$inferInsert;
}
