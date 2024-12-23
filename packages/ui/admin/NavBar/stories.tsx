import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from './index';
import { RouterProvider } from '../../storybook/RouterProvider';

const meta: Meta<typeof NavBar> = {
  title: 'admin/NavBar',
  component: NavBar,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: RouterProvider,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menus: [
      { icon: 'dashboard', title: '대시보드', pathname: '/' },
      { icon: 'notice', title: '공지사항', pathname: '/notice' },
      { icon: 'my', title: '내 정보', pathname: '/my' },
      { icon: 'skills', title: '기술스택', pathname: '/skills' },
      { icon: 'projects', title: '프로젝트', pathname: '/projects' },
    ],
  },
};

export default meta;
