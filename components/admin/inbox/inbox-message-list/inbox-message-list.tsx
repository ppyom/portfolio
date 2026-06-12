'use client';

import type { InboxMessage } from '@/types/inbox-message';

import { InboxMessageItem } from './inbox-message-item';

interface Props {
  messages: InboxMessage[];
}

export function InboxMessageList({ messages }: Props) {
  return (
    <div className="space-y-2">
      {messages.map((message) => (
        <InboxMessageItem key={message.id} message={message} />
      ))}
    </div>
  );
}
