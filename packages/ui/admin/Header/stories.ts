import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './index';

const meta: Meta<typeof Header> = {
  title: 'admin/Header',
  component: Header,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menus: [{ title: '대시보드', pathname: '/dashboard' }],
    name: '이예진',
    image: null,
  },
};

export default meta;
