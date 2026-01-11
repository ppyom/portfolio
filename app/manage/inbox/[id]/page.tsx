import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MoreVerticalIcon } from 'lucide-react';
import { toast } from 'sonner';

import { updateStatusAction } from '@/app/manage/inbox/actions';
import { getInboxMessage } from '@/services/contact';
import { cn } from '@/lib/utils';
import { fullDateString } from '@/lib/utils/date';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PageTitle from '@/components/common/page-title';
import CompleteButton from '@/components/admin/inbox/complete-button';
import CopyEmailButton from '@/components/admin/inbox/copy-email-button';
import InboxDropdown from '@/components/admin/inbox/inbox-dropdown';

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

  if (message.status === 'unread') {
    const result = await updateStatusAction(id, 'read');
    if (!result.success) {
      toast.error(result.message);
    }
  }

  return (
    <>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end justify-between">
        <PageTitle align="left">받은 메시지 상세</PageTitle>
        <div
          className={cn(
            'fixed bottom-4 left-4 right-4 grid grid-cols-2 gap-2',
            'sm:static sm:grid-cols-1',
          )}
        >
          <CompleteButton id={id} currentStatus={message.status} />
          <CopyEmailButton email={message.email} />
        </div>
      </div>
      <div className="space-y-2 px-4 relative">
        <p className="text-lg font-bold">{message.title}</p>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col">
            <p className="font-medium">
              {message.name}
              {message.company && (
                <span className="text-muted-foreground font-normal">
                  {' /'}
                  {message.company}
                </span>
              )}
            </p>

            <p className="text-sm text-muted-foreground">({message.email})</p>
          </div>

          <p className="text-xs text-muted-foreground/70">
            {fullDateString(message.createdAt)}
          </p>

          <InboxDropdown
            messageId={message.id}
            trigger={
              <Button
                className="absolute top-0 right-0 text-muted-foreground"
                variant="ghost"
                size="sm"
              >
                <MoreVerticalIcon />
              </Button>
            }
          />
        </div>
      </div>
      <Separator />
      <div className="px-4 whitespace-pre-wrap break-words leading-relaxed">
        {message.content}
      </div>
    </>
  );
}
