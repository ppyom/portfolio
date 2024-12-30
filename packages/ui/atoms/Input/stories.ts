import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'common/atom/Input',
  component: Input,
  argTypes: {
    value: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력해주세요.',
  },
};

export default meta;
