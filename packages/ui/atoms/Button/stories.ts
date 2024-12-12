import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'atoms/button',
  component: Button,
  tags: ['autodocs'],
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    onClick: () => console.log('clicked!'),
  },
};

export default meta;
