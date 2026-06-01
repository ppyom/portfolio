'use client';

import Link from 'next/link';
import {
  Edit2Icon,
  EyeIcon,
  MoreVerticalIcon,
  SquareArrowOutUpRightIcon,
  Trash2Icon,
} from 'lucide-react';

import { updateProjectVisibilityAction } from '@/app/manage/projects/actions';
import { Button } from '@/components/ui/button';
import {
  DropdownContent,
  DropdownItem,
  DropdownMenu,
  DropdownSeparator,
  DropdownTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';

import { ProjectDeleteDialog } from './project-delete-dialog';

interface Props {
  projectId: string;
  isPublic: boolean;
  applicationUrl: string | null;
}

export function ProjectDropdown({
  projectId,
  isPublic,
  applicationUrl,
}: Props) {
  const handleChangeVisibility = async () => {
    const result = await updateProjectVisibilityAction(projectId, !isPublic);
    if (result.success) {
      toast.success('공개 상태가 변경되었습니다.');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownTrigger>
        <Button
          className="text-text-muted hover:text-text-primary"
          variant="ghost"
          size="sm"
        >
          <MoreVerticalIcon size={14} />
        </Button>
      </DropdownTrigger>
      <DropdownContent align="end">
        {applicationUrl && (
          <>
            <DropdownItem>
              <Link href={applicationUrl} className="flex gap-2 w-full">
                <SquareArrowOutUpRightIcon size={14} />
                <span>사이트로 이동</span>
              </Link>
            </DropdownItem>
            <DropdownSeparator />
          </>
        )}
        <DropdownItem>
          <Link
            href={`/manage/projects/${projectId}`}
            className="flex gap-2 w-full"
          >
            <Edit2Icon size={14} />
            <span>수정</span>
          </Link>
        </DropdownItem>
        <DropdownItem onClick={handleChangeVisibility}>
          <EyeIcon size={14} />
          <span>{isPublic ? '비공개로 설정' : '공개로 설정'}</span>
        </DropdownItem>
        <DropdownSeparator />
        <ProjectDeleteDialog projectId={projectId}>
          <DropdownItem variant="destructive" preventClose>
            <Trash2Icon size={14} />
            <span>삭제</span>
          </DropdownItem>
        </ProjectDeleteDialog>
      </DropdownContent>
    </DropdownMenu>
  );
}
