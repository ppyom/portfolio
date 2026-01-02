import Link from 'next/link';
import { MoreVerticalIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { relativeDateString } from '@/lib/utils/date';
import { Button } from '@/components/ui/button';
import InboxDropdown from '@/components/admin/inbox/inbox-dropdown';
import type { InboxMessage } from '@/types/inbox-message';

interface Props {
  message: InboxMessage;
}

export default function InboxMessageItem({ message }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col rounded-lg border',
        message.status === 'completed' && 'opacity-50',
      )}
    >
      <div className="flex p-4 hover:bg-muted/50 cursor-pointer relative">
        <span
          className={cn(
            'shrink-0 w-2 h-2 mt-2 rounded-full',
            message.status === 'unread' && 'bg-primary',
            message.status === 'read' && 'bg-primary/50',
            message.status === 'completed' && 'bg-muted-foreground',
          )}
        />
        <Link
          href={`/manage/inbox/${message.id}`}
          className="ml-4 flex-1 min-w-0"
        >
          <div className="flex justify-between">
            <div className="min-w-0">
              <p className="text-sm text-foreground/80">
                {message.name}
                {message.company && <span> ({message.company})</span>}
              </p>
              <p className="font-medium truncate">{message.title}</p>
            </div>
            <span className="shrink-0 text-sm text-muted-foreground">
              {relativeDateString(message.createdAt)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {message.content}
          </p>
        </Link>
        <InboxDropdown
          messageId={message.id}
          trigger={
            <Button
              className="-translate-y-2 translate-x-2 text-muted-foreground"
              variant="ghost"
              size="sm"
            >
              <MoreVerticalIcon />
            </Button>
          }
        />
      </div>
    </div>
  );
}
