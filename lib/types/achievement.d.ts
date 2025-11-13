type AchievementType = 'Learning' | 'Certificate';

export interface Achievement {
  type: AchievementType;
  title: string;
  description?: string;
  date: string;
}
