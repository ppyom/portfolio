import {
  EducationTable,
  ExperienceTable,
  HistoryTable,
  ProfileTable,
} from '@/database/types/profile';

export interface Profile extends ProfileTable.Select {
  experience: ExperienceTable.Select[];
  education: EducationTable.Select[];
  history: HistoryTable.Select[];
}
