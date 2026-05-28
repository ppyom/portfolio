import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'ui/button',
  component: Button,
  tags: ['!dev'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost'],
      table: {
        type: {
          summary: 'primary | secondary | ghost',
        },
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: {
        type: {
          summary: 'sm | md | lg',
        },
        defaultValue: {
          summary: 'md',
        },
      },
    },
    isLoading: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

/**
 * Default Button
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
  },
};

/**
 * Variant 비교
 */
export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  ),
  args: {
    size: 'md',
  },
};

/**
 * Size 비교
 */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
  args: {
    variant: 'primary',
  },
};

/**
 * States
 */
export const States: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Button {...args} isLoading>
        Loading
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </div>
  ),
  args: {
    variant: 'primary',
    size: 'md',
  },
};

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
};
