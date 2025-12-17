import {
  EducationTable,
  ExperienceTable,
  ProfileTable,
} from '@/database/types';

export interface Profile extends ProfileTable.Select {
  experience: ExperienceTable.Select[];
  education: EducationTable.Select[];
}
