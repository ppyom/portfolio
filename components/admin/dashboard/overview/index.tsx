import { getUnreadMessageCount } from '@/database/queries/contact';
import { getLastProfileUpdate } from '@/database/queries/profile';
import { getTotalProjectCount } from '@/database/queries/project';
import { getLastSkillUpdate } from '@/database/queries/skill';
import { relativeDateString } from '@/lib/utils/date';

import StatCard from './stat-card';

export default async function DashboardOverview() {
  const [[project], [inbox], [skill], [profile]] = await Promise.all([
    getTotalProjectCount(),
    getUnreadMessageCount(),
    getLastSkillUpdate(),
    getLastProfileUpdate(),
  ]);

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard title="전체 프로젝트">{project.count}개</StatCard>
      <StatCard title="미확인 메시지">{inbox.count}개</StatCard>
      <StatCard title="스킬 업데이트">
        {relativeDateString(skill.updatedAt)}
      </StatCard>
      <StatCard title="프로필 업데이트">
        {relativeDateString(profile.updatedAt)}
      </StatCard>
    </section>
  );
}
