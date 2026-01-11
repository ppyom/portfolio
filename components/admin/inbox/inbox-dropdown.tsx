'use client';

import { useRouter } from 'next/navigation';
import { MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { deleteMessage } from '@/app/manage/inbox/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ConfirmDeleteButton from '@/components/common/dialog/confirm-delete-button';

interface Props {
  messageId: string;
  trigger: React.ReactNode;
}

export default function InboxDropdown({ messageId, trigger }: Props) {
  const router = useRouter();

  const handleDelete = () => {
    deleteMessage(messageId)
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message);
        }
        router.replace('/manage/inbox');
        toast.success('삭제되었습니다.');
      })
      .catch((error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.',
        );
      });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <ConfirmDeleteButton
          trigger={
            <DropdownMenuItem
              className="group"
              onSelect={(event) => {
                event.preventDefault();
              }}
            >
              <Trash2Icon className="group-hover:scale-120 group-hover:rotate-45 duration-300 transition" />
              <span>삭제</span>
            </DropdownMenuItem>
          }
          onConfirm={handleDelete}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
