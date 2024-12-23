import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from './index';

const meta: Meta<typeof Profile> = {
  title: 'admin/Profile',
  component: Profile,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '이예진',
    image: null,
  },
};

export default meta;
