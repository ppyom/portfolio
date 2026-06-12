'use client';

import Link from 'next/link';
import { MoreVerticalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { relativeDateString } from '@/lib/utils/date';
import { Button } from '@/components/ui/button';
import type { InboxMessage } from '@/types/inbox-message';

import { InboxDropdown } from '../inbox-dropdown';

interface Props {
  message: InboxMessage;
}

export function InboxMessageItem({ message }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border',
        message.status === 'completed' && 'opacity-50',
      )}
    >
      <div className="flex p-4 hover:bg-surface-secondary/50 cursor-pointer relative">
        <span
          className={cn(
            'shrink-0 size-2 mt-2 rounded-full',
            message.status === 'unread' && 'bg-brand-primary',
            message.status === 'read' && 'bg-brand-primary/50',
            message.status === 'completed' && 'bg-text-muted',
          )}
        />
        <Link
          href={`/manage/inbox/${message.id}`}
          className="ml-4 flex-1 min-w-0"
        >
          <div className="flex justify-between">
            <div className="min-w-0">
              <p className="text-sm text-text-secondary">
                {message.name}
                {message.company && <span> ({message.company})</span>}
              </p>
              <p className="text-text-primary font-bold truncate">
                {message.title}
              </p>
            </div>
            <span className="shrink-0 text-sm text-text-muted">
              {relativeDateString(message.createdAt)}
            </span>
          </div>
          <p className="text-sm text-text-secondary truncate">
            {message.content}
          </p>
        </Link>
        <InboxDropdown messageId={message.id}>
          <Button className="text-text-muted" variant="ghost" size="sm">
            <MoreVerticalIcon size={14} />
          </Button>
        </InboxDropdown>
      </div>
    </div>
  );
}
