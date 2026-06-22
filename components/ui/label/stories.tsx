import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Label } from './label';

const meta: Meta<typeof Label> = {
  title: 'ui/label',
  component: Label,
  tags: ['!dev'],
  argTypes: {
    required: {
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

type Story = StoryObj<typeof Label>;

/**
 * Default Label
 */
export const Default: Story = {
  args: {
    children: 'Label',
    required: false,
  },
};

/**
 * Required 비교
 */
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Label {...args}>Optional Label</Label>
      <Label {...args} required>
        Required Label
      </Label>
    </div>
  ),
};

/**
 * States
 */
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Label {...args}>Default</Label>

      <Label {...args} required>
        Required
      </Label>

      <div className="group" data-disabled>
        <Label {...args}>Disabled Style Preview</Label>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Label',
    required: false,
  },
};
