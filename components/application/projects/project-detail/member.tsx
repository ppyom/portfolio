import type { Project } from '@/types/project';

import { BulletList } from './bullet-list';

interface Props {
  member: NonNullable<Project['member']>;
}

export function Member({ member }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold text-text-primary">인원</p>
        <p className="text-text-secondary">{member.size}명</p>
      </div>
      <div>
        <p className="font-semibold text-text-primary">역할</p>
        <p className="text-text-secondary">{member.role}</p>
      </div>
      {member.responsibilities.length > 0 && (
        <div>
          <p className="font-semibold text-text-primary mb-2">담당 업무</p>
          <BulletList items={member.responsibilities} />
        </div>
      )}
    </div>
  );
}
