import { getUnreadMessageCount } from '@/services/contact';
import { getLastProfileUpdate } from '@/services/profile';
import { getTotalProjectCount } from '@/services/project';
import { getLastSkillUpdate } from '@/services/skills';
import { relativeDateString } from '@/lib/utils/date';

import StatCard from './stat-card';

export default async function DashboardOverview() {
  const [
    totalProjectCount,
    unreadMessageCount,
    skillUpdatedAt,
    profileUpdatedAt,
  ] = await Promise.all([
    getTotalProjectCount(),
    getUnreadMessageCount(),
    getLastSkillUpdate(),
    getLastProfileUpdate(),
  ]);

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard title="전체 프로젝트">{totalProjectCount}개</StatCard>
      <StatCard title="미확인 메시지">{unreadMessageCount}개</StatCard>
      <StatCard title="스킬 업데이트">
        {relativeDateString(skillUpdatedAt)}
      </StatCard>
      <StatCard title="프로필 업데이트">
        {relativeDateString(profileUpdatedAt)}
      </StatCard>
    </section>
  );
}
