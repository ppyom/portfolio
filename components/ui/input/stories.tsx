import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './input';

const meta: Meta<typeof Input> = {
  title: 'ui/input',
  component: Input,
  tags: ['!dev'],
  argTypes: {
    type: {
      table: {
        disable: true,
      },
    },
    variant: {
      control: 'inline-radio',
      options: ['default', 'error'],
      table: {
        type: {
          summary: 'default | error',
        },
        defaultValue: {
          summary: 'default',
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
  },
};
export default meta;

type Story = StoryObj<typeof Input>;

/**
 * Default Input
 */
export const Default: Story = {
  args: {
    placeholder: 'Input text...',
    variant: 'default',
    size: 'md',
  },
};

/**
 * Variant 비교
 */
export const Variants: Story = {
  render: (args) => (
    <div className="flex w-full flex-col gap-4">
      <Input {...args} variant="default" placeholder="Default input" />
      <Input {...args} variant="error" placeholder="Error input" />
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
    <div className="flex w-full flex-col gap-4">
      <Input {...args} size="sm" placeholder="Small input" />
      <Input {...args} size="md" placeholder="Medium input" />
      <Input {...args} size="lg" placeholder="Large input" />
    </div>
  ),
  args: {
    variant: 'default',
  },
};

/**
 * States
 */
export const States: Story = {
  render: (args) => (
    <div className="flex w-full flex-col gap-4">
      <Input {...args} placeholder="Default state" />
      <Input {...args} disabled placeholder="Disabled state" />
      <Input
        {...args}
        variant="error"
        placeholder="Error state"
        defaultValue="Invalid input"
      />
    </div>
  ),
  args: {
    size: 'md',
  },
};

export const Playground: Story = {
  args: {
    placeholder: 'Input text...',
    variant: 'default',
    size: 'md',
    disabled: false,
  },
};
