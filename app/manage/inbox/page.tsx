import type { Metadata } from 'next';

import { getInboxMessages } from '@/services/contact';
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
      <InboxMessageList messages={messages} />
    </>
  );
}
