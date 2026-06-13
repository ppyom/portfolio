import { getDashboardOverview } from '@/services/dashboard';
import { relativeDateString } from '@/lib/utils/date';

import { DashboardSection } from '../dashboard-section';

export async function DashboardOverview() {
  const [
    totalProjectCount,
    unreadMessageCount,
    skillUpdatedAt,
    profileUpdatedAt,
  ] = await getDashboardOverview();

  return (
    <section className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      <DashboardSection
        title="전체 프로젝트"
        className="text-2xl font-bold text-right"
      >
        {totalProjectCount}개
      </DashboardSection>
      <DashboardSection
        title="미확인 메시지"
        className="text-2xl font-bold text-right"
      >
        {unreadMessageCount}개
      </DashboardSection>
      <DashboardSection
        title="스킬 업데이트"
        className="text-2xl font-bold text-right"
      >
        {relativeDateString(skillUpdatedAt)}
      </DashboardSection>
      <DashboardSection
        title="프로필 업데이트"
        className="text-2xl font-bold text-right"
      >
        {relativeDateString(profileUpdatedAt)}
      </DashboardSection>
    </section>
  );
}
