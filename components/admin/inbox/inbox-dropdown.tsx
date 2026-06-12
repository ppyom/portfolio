'use client';

import type { ButtonHTMLAttributes } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2Icon } from 'lucide-react';

import { deleteMessage } from '@/app/manage/inbox/actions';
import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';
import { DeleteDialog } from '@/components/delete';

interface Props {
  messageId: string;
  children: React.ReactElement<ButtonHTMLAttributes<HTMLElement>>;
}

export function InboxDropdown({ messageId, children }: Props) {
  const router = useRouter();

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
    <DropdownMenu className="self-start">
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownContent align="end">
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
