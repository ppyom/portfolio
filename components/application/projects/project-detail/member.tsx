import type { Project } from '@/types/project';

import { BulletList } from './bullet-list';

interface Props {
  member: NonNullable<Project['member']>;
}

export function Member({ member }: Props) {
  return (
    <div className="grid grid-cols-[80px_1fr] gap-2">
      <span className="font-semibold">인원</span>
      <span>{member.size}명</span>

      <span className="font-semibold">역할</span>
      <span>{member.role}</span>

      <span className="font-semibold col-span-2 sm:col-span-1">담당 업무</span>
      <BulletList
        className="col-span-2 sm:col-span-1"
        name="member"
        items={member.responsibilities}
        color="secondary"
      />
    </div>
  );
}
