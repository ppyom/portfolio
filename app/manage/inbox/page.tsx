import type { Metadata } from 'next';
import { InboxIcon } from 'lucide-react';

import { getInboxMessages } from '@/services/contact';
import { InboxMessageList } from '@/components/admin/inbox/inbox-message-list';
import { Empty } from '@/components/feedback/empty';

export const metadata: Metadata = {
  title: '받은 메시지',
};

export default async function Page() {
  const messages = await getInboxMessages();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8">
      <div className="flex-1 space-y-2">
        <p className="text-2xl font-bold">받은 메시지</p>
        <p className="text-text-secondary">
          사용자가 보낸 문의 메시지를 확인하고 관리할 수 있습니다.
        </p>
      </div>
      {messages.length === 0 && (
        <Empty
          icon={InboxIcon}
          title="받은 메시지가 없습니다."
          description="아직 도착한 문의가 없습니다."
        />
      )}
      {messages.length > 0 && <InboxMessageList messages={messages} />}
    </div>
  );
}
