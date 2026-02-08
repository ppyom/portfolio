import { cn } from '@/lib/utils';
import SectionTitle from '@/components/common/section-title';
import SkillTag from '@/components/common/skill-tag';
import type { Skill } from '@/types/skill';

interface Props {
  skills: Skill[];
  title?: string;
}

export default function TechStacks({ skills, title }: Props) {
  return (
    <div className="space-y-6">
      {title && <SectionTitle>{title}</SectionTitle>}
      <div className="grid md:grid-cols-2 gap-8">
        {skills.map((skillGroup) => (
          <div
            key={skillGroup.category}
            className={cn(
              `bg-card rounded-xl p-6 border border-border glow-hover transition-all duration-500`,
            )}
          >
            <h3 className="text-primary font-bold text-lg mb-4">
              {skillGroup.category}
            </h3>
            <div className="flex flex-wrap gap-3">
              {skillGroup.items.map((skill) => (
                <SkillTag key={skill} name={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
