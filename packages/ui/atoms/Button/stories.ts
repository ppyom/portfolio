import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'common/atom/Button',
  component: Button,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    onClick: () => alert('clicked!'),
    bg: 'primary',
  },
};

export default meta;
