import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './index';
import { IconTypes } from '../../icon/icons';

const meta: Meta<typeof NavItem> = {
  title: 'admin/NavItem',
  component: NavItem,
  argTypes: {
    icon: {
      control: 'select',
      options: IconTypes,
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: 'test',
    title: '메뉴이름',
    isActive: false,
    onClick: () => alert('clicked!'),
  },
};

export default meta;
