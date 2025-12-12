import type { Project } from '@/types/project';
import ListContent from './list-content';
import ProjectContentBase from './content-base';

interface Props {
  member: NonNullable<Project['member']>;
}

export default function MemberContent({ member }: Props) {
  return (
    <ProjectContentBase title="프로젝트 구성원">
      <div className="grid grid-cols-[80px_1fr] gap-2">
        <span className="font-semibold">인원</span>
        <span>{member.size}명</span>

        <span className="font-semibold">역할</span>
        <span>{member.role}</span>

        <span className="font-semibold col-span-2 sm:col-span-1">
          담당 업무
        </span>
        <ListContent
          className="col-span-2 sm:col-span-1"
          key="member"
          items={member.responsibilities}
          color="secondary"
        />
      </div>
    </ProjectContentBase>
  );
}
