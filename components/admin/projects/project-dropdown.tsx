'use client';

import Link from 'next/link';
import { Edit2Icon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';

import { deleteProjectAction } from '@/app/manage/projects/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ConfirmDeleteButton from '@/components/common/dialog/confirm-delete-button';

interface Props {
  projectId: string;
}

export default function ProjectDropdown({ projectId }: Props) {
  const handleDelete = async () => {
    const result = await deleteProjectAction(projectId);
    if (result.success) {
      toast.success('삭제되었습니다.');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="ghost" size="icon">
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="group" asChild>
          <Link href={`/manage/projects/${projectId}`}>
            <Edit2Icon className="group-hover:scale-120 group-hover:animate-bounce duration-300 transition" />
            <span>수정</span>
          </Link>
        </DropdownMenuItem>
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
