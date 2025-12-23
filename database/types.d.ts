import { fileTable } from '@/database/schema/file.schema';
import { projectTable } from '@/database/schema/project.schema';
import { techStackTable } from '@/database/schema/tech-stack.schema';
import { profileTable } from '@/database/schema/profile.schema';
import { experienceTable } from '@/database/schema/experience.schema';
import { educationTable } from '@/database/schema/education.schema';

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
