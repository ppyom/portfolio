import { achievementTypeLabel } from '@/lib/constants/achievement';
import { Badge } from '@/components/ui/badge';
import type { Achievement as AchievementType } from '@/types/achievement';

interface Props {
  contents: AchievementType[];
}

export function Achievement({ contents }: Props) {
  return (
    <div className="columns-1 md:columns-2 gap-6">
      {contents.map(({ type, name, description, date }, idx) => (
        <div
          key={`${type}_${idx}`}
          className="bg-surface-secondary rounded-md p-6 border space-y-3 not-last:mb-6 break-inside-avoid"
        >
          <div className="flex items-center gap-2">
            <Badge variant="info">{achievementTypeLabel[type]}</Badge>
            <span className="text-text-muted text-sm">{date}</span>
          </div>
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <p className="text-lg font-bold text-text-primary">{name}</p>
              {description && (
                <p className="text-base text-text-secondary">{description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
