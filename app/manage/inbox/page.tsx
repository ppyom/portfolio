import { getInboxMessages } from '@/database/queries/contact';
import PageTitle from '@/components/common/page-title';
import InboxMessageList from '@/components/admin/inbox/list';

export default async function Page() {
  const messages = await getInboxMessages();

  console.log(messages);

  return (
    <>
      <PageTitle align="left">받은 메시지</PageTitle>
      <InboxMessageList messages={messages} />
    </>
  );
}
