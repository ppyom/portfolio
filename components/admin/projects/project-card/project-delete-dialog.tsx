'use client';

import { type ButtonHTMLAttributes, useState, useTransition } from 'react';

import { deleteProjectAction } from '@/app/manage/projects/actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';

interface Props {
  projectId: string;
  projectName?: string;
  children: React.ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>;
}

export function ProjectDeleteDialog({
  projectId,
  projectName,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProjectAction(projectId);
      if (result.success) {
        toast.success('삭제되었습니다.');
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>삭제하시겠습니까?</DialogTitle>
          <DialogDescription>
            <strong className="bold">{projectName ?? '이 프로젝트'}</strong>는
            삭제되며 복구할 수 없습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost" disabled={isPending}>
              취소
            </Button>
          </DialogClose>
          <Button isLoading={isPending} onClick={handleDelete}>
            {isPending ? '삭제 중' : '삭제'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
