'use client';

import { CheckCircleIcon, Undo2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { updateStatusAction } from '@/app/manage/inbox/actions';
import { Button } from '@/components/ui/button';
import type { InboxMessage } from '@/types/inbox-message';

interface Props {
  id: string;
  currentStatus: InboxMessage['status'];
}

export default function CompleteButton({ id, currentStatus }: Props) {
  const text =
    currentStatus === 'read' ? (
      <>
        <CheckCircleIcon />
        완료로 표시
      </>
    ) : (
      <>
        <Undo2Icon />
        되돌리기
      </>
    );

  return (
    <Button
      className="cursor-pointer"
      onClick={async () => {
        const result = await updateStatusAction(
          id,
          currentStatus === 'read' ? 'completed' : 'read',
        );
        if (result.success) {
          toast.success(
            currentStatus === 'read'
              ? '메시지를 완료로 표시했습니다.'
              : '메시지를 다시 읽음 상태로 되돌렸습니다.',
          );
        } else {
          toast.error(result.message);
        }
      }}
    >
      {text}
    </Button>
  );
}
