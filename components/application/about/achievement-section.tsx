import type { Achievement } from '@/types/achievement';

import { AchievementCard } from './achievement-card';

interface Props {
  title: string;
  items: Achievement[];
}

export function AchievementSection({ title, items }: Props) {
  return (
    <div className="space-y-6">
      <p className="text-xl md:text-2xl font-bold text-text-primary">{title}</p>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <AchievementCard key={`learnings_${idx}`} {...item} />
        ))}
      </div>
    </div>
  );
}
