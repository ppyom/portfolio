'use client';

import { type ButtonHTMLAttributes, useState, useTransition } from 'react';

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

interface Props {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactElement<ButtonHTMLAttributes<HTMLElement>>;
  onConfirm: () => void | Promise<void>;
}

export function DeleteDialog({
  title = '삭제하시겠습니까?',
  description = '삭제한 데이터는 복구할 수 없습니다.',
  confirmText = '삭제',
  cancelText = '취소',
  children,
  onConfirm,
}: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      await onConfirm();
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant="ghost" disabled={isPending}>
              {cancelText}
            </Button>
          </DialogClose>

          <Button isLoading={isPending} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
