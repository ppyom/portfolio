import SectionTitle from '@/components/common/section-title';
import type { Achievement } from '@/types/achievement';

import AchievementCard from './achievement-card';

interface Props {
  title: string;
  items: Achievement[];
}

export default function AchievementSection({ title, items }: Props) {
  return (
    <div className="space-y-6">
      <SectionTitle>{title}</SectionTitle>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, idx) => (
          <AchievementCard key={`learnings_${idx}`} {...item} />
        ))}
      </div>
    </div>
  );
}
