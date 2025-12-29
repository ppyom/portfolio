import { educationTable } from '@/database/schema/education.schema';
import { experienceTable } from '@/database/schema/experience.schema';
import { historyTable } from '@/database/schema/history.schema';
import { profileTable } from '@/database/schema/profile.schema';

export namespace ProfileTable {
  type Select = typeof profileTable.$inferSelect;
  type Insert = typeof profileTable.$inferInsert;
}

export namespace ExperienceTable {
  type Select = typeof experienceTable.$inferSelect;
  type Insert = typeof experienceTable.$inferInsert;
}

export namespace EducationTable {
  type Select = typeof educationTable.$inferSelect;
  type Insert = typeof educationTable.$inferInsert;
}

export namespace HistoryTable {
  type Select = typeof historyTable.$inferSelect;
  type Insert = typeof historyTable.$inferInsert;
}
