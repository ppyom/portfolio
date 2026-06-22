import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Dialog } from './dialog';
import { DialogClose } from './dialog-close';
import { DialogContent } from './dialog-content';
import { DialogDescription } from './dialog-description';
import { DialogFooter } from './dialog-footer';
import { DialogHeader } from './dialog-header';
import { DialogTitle } from './dialog-title';
import { DialogTrigger } from './dialog-trigger';

const meta: Meta<typeof Dialog> = {
  title: 'ui/dialog',
  component: Dialog,
  tags: ['!dev'],
  argTypes: {
    defaultOpen: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

function CompositionStory() {
  const [name, setName] = useState('');

  return (
    <Dialog>
      <DialogTrigger>
        <Button>프로필 수정</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>프로필 수정</DialogTitle>
          <DialogDescription>
            사용자 정보를 수정할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Field>
            <Label htmlFor="name">이름</Label>

            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름 입력"
            />
          </Field>
        </div>

        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">취소</Button>
          </DialogClose>

          <Button>저장</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ConfirmStory() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>삭제</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>삭제하시겠습니까?</DialogTitle>

          <DialogDescription>이 작업은 되돌릴 수 없습니다.</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant="ghost">취소</Button>
          </DialogClose>

          <Button onClick={() => setOpen(false)}>삭제</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Default
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger>
        <Button>열기</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>기본 다이얼로그</DialogTitle>

          <DialogDescription>기본 Dialog 구조입니다.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Composition
 */
export const Composition: Story = {
  render: () => <CompositionStory />,
};

/**
 * Confirm
 */
export const Confirm: Story = {
  render: () => <ConfirmStory />,
};
