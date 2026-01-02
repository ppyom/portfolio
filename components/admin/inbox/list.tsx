import InboxMessageItem from '@/components/admin/inbox/item';
import type { InboxMessage } from '@/types/inbox-message';

interface Props {
  messages: InboxMessage[];
}

export default function InboxMessageList({ messages }: Props) {
  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <InboxMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}
