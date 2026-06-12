import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { updateStatusAction } from '@/app/manage/inbox/actions';
import { getInboxMessage } from '@/services/contact';
import { commonErrorMessages } from '@/lib/constants/error-messages';
import { inboxStatusLabel, inboxStatusVariant } from '@/lib/constants/inbox';
import { fullDateString } from '@/lib/utils/date';
import { Badge } from '@/components/ui/badge';
import { InboxDropdown } from '@/components/admin/inbox/inbox-dropdown';
import { SystemError } from '@/components/feedback/system-error';

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: '받은 메시지 상세',
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const message = await getInboxMessage(id);

  if (!message) {
    return notFound();
  }

  let systemError: string | null = null;

  if (message.status === 'unread') {
    const result = await updateStatusAction(id, 'read');
    if (!result.success) {
      systemError = result.message || commonErrorMessages.unknown.default;
    }
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8">
      <SystemError message={systemError} />
      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-end justify-between">
        <div className="flex-1 space-y-2">
          <Badge variant={inboxStatusVariant[message.status]}>
            {inboxStatusLabel[message.status]}
          </Badge>
          <p className="text-2xl font-bold">{message.title}</p>
          <p className="font-medium">
            <span className="text-text-secondary">{message.name}</span>
            {message.company && (
              <span className="text-text-muted font-normal">
                {' /'}
                {message.company}
              </span>
            )}
          </p>
          <p className="text-sm text-text-muted">({message.email})</p>
          <p className="text-xs text-text-muted/70">
            {fullDateString(message.createdAt)}
          </p>
          <InboxDropdown
            className="absolute top-0 right-0"
            messageId={message.id}
            currentStatus={message.status}
            email={message.email}
          />
        </div>
      </div>
      <div className="px-4 whitespace-pre-wrap wrap-break-word leading-relaxed">
        {message.content}
      </div>
    </div>
  );
}
