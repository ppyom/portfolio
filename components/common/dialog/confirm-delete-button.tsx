'use client';

import { Trash2Icon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface Props {
  onConfirm: () => void;
  title?: string;
  description?: string;
  trigger?: React.ReactNode;
}

export default function ConfirmDeleteButton({
  onConfirm,
  trigger = (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      className="hover:bg-destructive/10 hover:text-destructive"
    >
      <Trash2Icon />
    </Button>
  ),
  title = '삭제하시겠습니까?',
  description = '이 작업은 되돌릴 수 없습니다.',
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
