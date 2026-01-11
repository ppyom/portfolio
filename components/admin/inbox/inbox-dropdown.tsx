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

  const handleDelete = async () => {
    const result = await deleteMessage(messageId);
    if (result.success) {
      router.replace('/manage/inbox');
      toast.success('삭제되었습니다.');
    } else {
      toast.error(result.message);
    }
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
