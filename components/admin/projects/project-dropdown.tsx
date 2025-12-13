'use client';

import Link from 'next/link';
import { Edit2Icon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { deleteProject } from '@/app/manage/projects/actions';

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
        // 삭제되었습니다
      })
      .catch(console.error);
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
        <DropdownMenuItem className="group" onClick={handleDelete}>
          <Trash2Icon className="group-hover:scale-120 group-hover:rotate-45 duration-300 transition" />
          <span>삭제</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
