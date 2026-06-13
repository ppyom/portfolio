import Link from 'next/link';

import { getRecentMessages } from '@/services/contact';
import { Button } from '@/components/ui/button';

import { InboxMessageList } from '../../inbox/inbox-message-list';
import { DashboardSection } from '../dashboard-section';

export async function DashboardInbox() {
  const messages = await getRecentMessages();
  return (
    <DashboardSection
      title="받은 메시지"
      action={
        <Button
          className="text-text-secondary font-bold"
          variant="ghost"
          size="sm"
        >
          <Link href="/manage/inbox">더보기</Link>
        </Button>
      }
      className="min-h-96"
    >
      {messages.length > 0 && <InboxMessageList messages={messages} />}
    </DashboardSection>
  );
}
