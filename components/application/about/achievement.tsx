import type { Achievement as AchievementType } from '@/types/achievement';

import { AchievementCard } from './achievement-card';

interface Props {
  items: AchievementType[];
}

export function Achievement({ items }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {items.map((item, idx) => (
        <AchievementCard key={`learnings_${idx}`} {...item} />
      ))}
    </div>
  );
}
