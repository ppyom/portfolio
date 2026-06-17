import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Modal } from './modal';
import { ModalClose } from './modal-close';
import { ModalContent } from './modal-content';
import { ModalTrigger } from './modal-trigger';

const meta: Meta<typeof Modal> = {
  title: 'ui/modal',
  component: Modal,
  tags: [],
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

type Story = StoryObj<typeof Modal>;

/**
 * Default
 */
export const Default: Story = {
  render: () => {
    return (
      <Modal>
        <ModalTrigger>
          <Button>열기</Button>
        </ModalTrigger>
        <ModalContent>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">기본 모달</h2>
            <p className="text-sm text-muted-foreground">
              가장 단순한 Modal 구조입니다.
            </p>
            <ModalClose>
              <Button className="absolute top-4 right-4" variant="ghost">
                <XIcon size={14} />
              </Button>
            </ModalClose>
          </div>
        </ModalContent>
      </Modal>
    );
  },
};
