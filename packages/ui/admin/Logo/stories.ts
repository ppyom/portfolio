import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './index';

const meta: Meta<typeof Logo> = {
  title: 'admin/Logo',
  component: Logo,
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
