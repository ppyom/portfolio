import Link from 'next/link';

import { cn } from '@/lib/utils';
import { relativeDateString } from '@/lib/utils/date';
import type { InboxMessage } from '@/types/inbox-message';

interface Props {
  message: InboxMessage;
}

export default function InboxMessageItem({ message }: Props) {
  return (
    <Link
      href={`/manage/inbox/${message.id}`}
      className={cn(
        'flex flex-col rounded-lg border',
        message.status === 'completed' && 'opacity-50',
      )}
    >
      <div className="flex gap-4 p-4 hover:bg-muted/50 cursor-pointer">
        <span
          className={cn(
            'shrink-0 w-2 h-2 mt-2 rounded-full',
            message.status === 'unread' && 'bg-primary',
            message.status === 'read' && 'bg-primary/50',
            message.status === 'completed' && 'bg-muted-foreground',
          )}
        />
        <div className="flex-1 min-w-0">
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
        </div>
      </div>
    </Link>
  );
}
