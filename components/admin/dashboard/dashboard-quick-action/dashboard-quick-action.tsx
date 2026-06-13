import { BookIcon, InboxIcon, StarIcon, UserPenIcon } from 'lucide-react';

import { DashboardSection } from '@/components/admin/dashboard/dashboard-section';

import { QuickActionItem } from './quick-action-item';

export function DashboardQuickActions() {
  return (
    <DashboardSection title="Quick Action" className="flex flex-col gap-2">
      <QuickActionItem
        icon={BookIcon}
        name="새로운 프로젝트 추가"
        href="/manage/projects/new"
      />
      <QuickActionItem
        icon={UserPenIcon}
        name="프로필 수정"
        href="/manage/profile"
      />
      <QuickActionItem icon={StarIcon} name="스킬 관리" href="/manage/skills" />
      <QuickActionItem
        icon={InboxIcon}
        name="받은 메시지함"
        href="/manage/inbox"
      />
    </DashboardSection>
  );
}
