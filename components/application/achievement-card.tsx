import type { Achievement } from '@/types/achievement';

type Props = Omit<Achievement, 'type'>;

export default function AchievementCard({ title, description, date }: Props) {
  return (
    <div className="bg-card rounded-xl p-6 pb-5 border border-border glow-hover space-y-3">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          {description && (
            <p className="text-base text-foreground/70">{description}</p>
          )}
        </div>
      </div>
      <div className="flex">
        <span className="text-sm px-3 py-1 bg-secondary text-secondary-foreground/70 rounded-full">
          {date}
        </span>
      </div>
    </div>
  );
}
