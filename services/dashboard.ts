import { getUnreadMessageCount } from '@/services/contact';
import { getLastProfileUpdate } from '@/services/profile';
import { getTotalProjectCount } from '@/services/project';
import { getLastSkillUpdate } from '@/services/skills';

export const getDashboardOverview = async () =>
  await Promise.all([
    getTotalProjectCount(),
    getUnreadMessageCount(),
    getLastSkillUpdate(),
    getLastProfileUpdate(),
  ]);
