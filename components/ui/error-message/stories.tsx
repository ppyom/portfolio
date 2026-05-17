import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ErrorMessage } from './error-message';

const meta: Meta<typeof ErrorMessage> = {
  title: 'ui/error-message',
  component: ErrorMessage,
  tags: ['!dev'],
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

/**
 * Default ErrorMessage
 */
export const Default: Story = {
  args: {
    children: '필수 입력 항목입니다.',
  },
};

/**
 * States
 */
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <ErrorMessage {...args}>필수 입력 항목입니다.</ErrorMessage>

      <ErrorMessage {...args}>올바른 이메일 형식이 아닙니다.</ErrorMessage>

      <ErrorMessage {...args}>
        여러 줄 오류 메시지도 자연스럽게 표시됩니다.
      </ErrorMessage>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Error message',
  },
};
