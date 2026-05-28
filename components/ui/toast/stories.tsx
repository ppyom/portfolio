import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/ui/button';

import { toast } from './toast';

const meta: Meta = {
  title: 'ui/toast',
  tags: ['!dev'],
};

export default meta;

type Story = StoryObj;

/**
 * Default
 */
export const Default: Story = {
  render: () => (
    <Button onClick={() => toast('기본 Toast 메시지')}>Show Toast</Button>
  ),
};

/**
 * Variants
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast('기본 메시지')}>Default</Button>

      <Button
        onClick={() => toast.success('저장 완료', '변경사항이 반영됐습니다.')}
      >
        Success
      </Button>

      <Button onClick={() => toast.error('삭제 실패', '다시 시도해주세요.')}>
        Error
      </Button>

      <Button
        onClick={() => toast.warning('주의 필요', '확인 후 진행해주세요.')}
      >
        Warning
      </Button>

      <Button onClick={() => toast.info('새 알림', '업데이트가 있습니다.')}>
        Info
      </Button>
    </div>
  ),
};

/**
 * States
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={() =>
          toast('닫기 버튼', {
            closable: true,
          })
        }
      >
        With Close Button
      </Button>
      <Button
        onClick={() =>
          toast('짧은 Toast', {
            duration: 1500,
          })
        }
      >
        Short
      </Button>
      <Button
        onClick={() =>
          toast('긴 Toast', {
            duration: 10000,
          })
        }
      >
        Long
      </Button>
    </div>
  ),
};

/**
 * Composition
 */
export const Composition: Story = {
  render: () => (
    <Button
      onClick={() =>
        toast.success('프로필 저장 완료', '변경된 정보가 반영됐습니다.')
      }
    >
      Save Profile
    </Button>
  ),
};
