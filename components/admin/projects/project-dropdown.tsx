'use client';

import Link from 'next/link';
import { Edit2Icon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { deleteProject } from '@/app/manage/projects/actions';
import ConfirmDeleteButton from '@/components/base/confirm-delete-button';

interface Props {
  projectId: string;
}

export default function ProjectDropdown({ projectId }: Props) {
  const handleDelete = () => {
    deleteProject(projectId)
      .then((result) => {
        if (!result.success) {
          throw new Error(result.message);
        }
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
