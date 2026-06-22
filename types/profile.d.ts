import {
  EducationTable,
  ExperienceTable,
  HistoryTable,
  ProfileTable,
} from '@/database/types/profile';
import type { FormDataType } from '@/lib/validation/profile.schema';

export interface Profile extends ProfileTable.Select {
  experience: ExperienceTable.Select[];
  education: EducationTable.Select[];
  history: HistoryTable.Select[];
}

export interface ProfileFormData extends FormDataType {
  introduce: string[];
}
