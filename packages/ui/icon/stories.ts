import type { Meta, StoryObj } from '@storybook/react';
import { IconTypes } from '@packages/types/components';
import { Icon } from './index';

const meta: Meta<typeof Icon> = {
  title: 'common/Icon',
  component: Icon,
  argTypes: {
    type: {
      control: 'select',
      options: IconTypes,
    },
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'test',
  },
};

export default meta;
