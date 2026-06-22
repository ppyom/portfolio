'use client';

import { useRouter } from 'next/navigation';
import {
  CheckCircleIcon,
  CopyIcon,
  MailIcon,
  MailOpenIcon,
  MoreVerticalIcon,
  Trash2Icon,
  Undo2Icon,
} from 'lucide-react';

import { deleteMessage, updateStatusAction } from '@/app/manage/inbox/actions';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  DropdownTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';
import { DeleteDialog } from '@/components/delete';
import type { InboxMessage } from '@/types/inbox-message';

interface Props {
  messageId: string;
  currentStatus: InboxMessage['status'];
  email: InboxMessage['email'];
  className?: string;
}

export function InboxDropdown({
  messageId,
  currentStatus,
  email,
  className,
}: Props) {
  const router = useRouter();

  const readAction =
    currentStatus === 'read'
      ? {
          icon: MailIcon,
          label: '안읽음 상태로 변경',
          nextStatus: 'unread' as const,
        }
      : {
          icon: MailOpenIcon,
          label: '읽음 상태로 변경',
          nextStatus: 'read' as const,
        };
  const completedAction =
    currentStatus === 'read'
      ? {
          icon: CheckCircleIcon,
          label: '완료로 표시',
          nextStatus: 'completed' as const,
        }
      : {
          icon: Undo2Icon,
          label: '읽음 상태로 되돌리기',
          nextStatus: 'read' as const,
        };

  const handleChangeStatus = async (status: InboxMessage['status']) => {
    const result = await updateStatusAction(messageId, status);

    if (result.success) {
      toast.success('메시지 상태를 변경했습니다.');
    } else {
      toast.error(result.message);
    }
  };

  const handleEmailCopy = async () => {
    await navigator.clipboard.writeText(email);
    toast.success('이메일주소가 복사되었습니다.');
  };

  const handleDelete = async () => {
    const result = await deleteMessage(messageId);
    if (result.success) {
      toast.success('삭제되었습니다.');
      router.replace('/manage/inbox');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <DropdownMenu className={cn('self-start', className)}>
      <DropdownTrigger>
        <Button className="text-text-muted" variant="ghost" size="sm">
          <MoreVerticalIcon size={14} />
        </Button>
      </DropdownTrigger>
      <DropdownContent align="end">
        {currentStatus !== 'completed' && (
          <DropdownItem
            onClick={() => handleChangeStatus(readAction.nextStatus)}
          >
            <readAction.icon size={14} />
            {readAction.label}
          </DropdownItem>
        )}
        {currentStatus !== 'unread' && (
          <DropdownItem
            onClick={() => handleChangeStatus(completedAction.nextStatus)}
          >
            <completedAction.icon size={14} />
            {completedAction.label}
          </DropdownItem>
        )}
        <DropdownSeparator />
        <DropdownItem onClick={handleEmailCopy}>
          <CopyIcon size={14} />
          이메일 주소 복사
        </DropdownItem>
        <DropdownSeparator />
        <DeleteDialog onConfirm={handleDelete}>
          <DropdownItem variant="destructive" preventClose>
            <Trash2Icon size={14} />
            <span>삭제</span>
          </DropdownItem>
        </DeleteDialog>
      </DropdownContent>
    </DropdownMenu>
  );
}
