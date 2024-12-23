import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './index';

const meta: Meta<typeof Breadcrumb> = {
  title: 'admin/Breadcrumb',
  component: Breadcrumb,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menus: [
      { icon: 'projects', title: '프로젝트', pathname: '/projects' },
      { icon: 'projects', title: '프로젝트1', pathname: '/projects/1' },
    ],
  },
};

export default meta;
