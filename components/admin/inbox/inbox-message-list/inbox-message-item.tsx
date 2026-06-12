'use client';

import Link from 'next/link';

import { inboxStatusLabel, inboxStatusVariant } from '@/lib/constants/inbox';
import { cn } from '@/lib/utils';
import { relativeDateString } from '@/lib/utils/date';
import { Badge } from '@/components/ui/badge';
import type { InboxMessage } from '@/types/inbox-message';

import { InboxDropdown } from '../inbox-dropdown';

interface Props {
  message: InboxMessage;
}

export function InboxMessageItem({ message }: Props) {
  return (
    <div className="flex flex-col rounded-lg border p-6 hover:bg-surface-secondary/50 cursor-pointer relative">
      <Link href={`/manage/inbox/${message.id}`} className="flex-1 min-w-0">
        <div className="flex justify-between">
          <div className="min-w-0 space-y-1">
            <Badge variant={inboxStatusVariant[message.status]} size="sm">
              {inboxStatusLabel[message.status]}
            </Badge>
            <p
              className={cn(
                'truncate text-text-primary',
                message.status === 'unread' ? 'font-bold' : 'font-medium',
              )}
            >
              {message.title}
            </p>
            <p className="text-sm">
              <span className="text-text-secondary">{message.name}</span>
              {message.company && (
                <span className="text-text-muted font-normal">
                  {' /'}
                  {message.company}
                </span>
              )}
            </p>
          </div>
          <span className="shrink-0 self-end text-sm text-text-muted">
            {relativeDateString(message.createdAt)}
          </span>
        </div>
      </Link>
      <InboxDropdown
        className="absolute top-4 right-4"
        messageId={message.id}
        currentStatus={message.status}
        email={message.email}
      />
    </div>
  );
}
