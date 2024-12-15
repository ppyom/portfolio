import type { Meta, StoryObj } from '@storybook/react';
import { Typography, typographyTypes } from './index';

const meta: Meta<typeof Typography> = {
  title: 'common/atom/Typography',
  component: Typography,
  argTypes: {
    type: {
      control: 'select',
      options: typographyTypes,
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'title',
    children: '텍스트를 입력해주세요.',
  },
};

export default meta;
