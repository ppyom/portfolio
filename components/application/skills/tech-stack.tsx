import type { Skill } from '@/types/skill';

import { SkillTag } from './skill-tag';

interface Props {
  skills: Skill[];
}

export function TechStack({ skills }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {skills.map((skillGroup) => (
        <div
          key={skillGroup.category}
          className="bg-surface-secondary rounded-md p-6 border"
        >
          <p className="text-text-primary font-bold text-lg mb-4">
            {skillGroup.category}
          </p>
          <div className="flex flex-wrap gap-3">
            {skillGroup.items.map((skill) => (
              <SkillTag key={skill} name={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
