import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'ui/textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
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
    resizable: {
      control: 'boolean',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Textarea>;

/**
 * Default Textarea
 */
export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    variant: 'default',
    size: 'md',
  },
};

/**
 * Variant 비교
 */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Textarea {...args} variant="default" placeholder="Default textarea" />
      <Textarea {...args} variant="error" placeholder="Error textarea" />
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
    <div className="flex flex-col gap-4">
      <Textarea {...args} size="sm" placeholder="Small textarea" />
      <Textarea {...args} size="md" placeholder="Medium textarea" />
      <Textarea {...args} size="lg" placeholder="Large textarea" />
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
    <div className="flex flex-col gap-4">
      <Textarea {...args} placeholder="Default state" />
      <Textarea {...args} disabled placeholder="Disabled state" />
      <Textarea {...args} variant="error" defaultValue="Invalid message" />
    </div>
  ),
  args: {
    size: 'md',
  },
};

export const Playground: Story = {
  args: {
    placeholder: 'Enter your message...',
    variant: 'default',
    size: 'md',
    disabled: false,
    resizable: false,
  },
};
