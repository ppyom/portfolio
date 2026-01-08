import { BookIcon, InboxIcon, StarIcon, UserPenIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import ActionItem from './action-item';

export default function DashboardQuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-muted-foreground">Quick Action</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <ActionItem
          icon={BookIcon}
          name="새로운 프로젝트 추가"
          href="/manage/projects/new"
        />
        <ActionItem
          icon={UserPenIcon}
          name="프로필 수정"
          href="/manage/profile"
        />
        <ActionItem icon={StarIcon} name="스킬 관리" href="/manage/skills" />
        <ActionItem
          icon={InboxIcon}
          name="받은 메시지함"
          href="/manage/inbox"
        />
      </CardContent>
    </Card>
  );
}
