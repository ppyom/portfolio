import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './index';

const meta: Meta<typeof Avatar> = {
  title: 'admin/Avatar',
  component: Avatar,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: null,
  },
};

export default meta;
