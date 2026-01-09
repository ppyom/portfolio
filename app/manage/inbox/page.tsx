import type { Metadata } from 'next';
import { InboxIcon } from 'lucide-react';

import { getInboxMessages } from '@/services/contact';
import Empty from '@/components/common/empty';
import PageTitle from '@/components/common/page-title';
import InboxMessageList from '@/components/admin/inbox/list';

export const metadata: Metadata = {
  title: '받은 메시지',
};

export default async function Page() {
  const messages = await getInboxMessages();

  return (
    <>
      <PageTitle align="left">받은 메시지</PageTitle>
      {messages.length === 0 && (
        <Empty
          icon={InboxIcon}
          title="받은 메시지가 없습니다."
          description="아직 도착한 문의가 없습니다."
        />
      )}
      {messages.length > 0 && <InboxMessageList messages={messages} />}
    </>
  );
}
