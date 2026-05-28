import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Avatar } from './avatar';

const meta: Meta<typeof Avatar> = {
  title: 'ui/avatar',
  component: Avatar,
  tags: ['!dev'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

/**
 * Default
 */
export const Default: Story = {
  args: {
    src: 'https://github.com/ppyom.png',
    alt: 'Avatar',
    fallback: 'A',
    size: 'md',
  },
};

/**
 * Sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar src="https://github.com/ppyom.png" alt="Small" size="sm" />
      <Avatar src="https://github.com/ppyom.png" alt="Medium" size="md" />
      <Avatar src="https://github.com/ppyom.png" alt="Large" size="lg" />
      <Avatar src="https://github.com/ppyom.png" alt="Extra Large" size="xl" />
    </div>
  ),
};

/**
 * Fallback
 */
export const Fallback: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar fallback="예" size="sm" />
      <Avatar fallback="예" size="md" />
      <Avatar fallback="예진" size="lg" />
      <Avatar fallback="이예진" size="xl" />
    </div>
  ),
};

/**
 * Composition
 */
export const Composition: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar
        src="https://github.com/ppyom.png"
        alt="이예진"
        fallback="예"
        size="lg"
      />

      <div>
        <p className="font-medium">이예진</p>
        <p className="text-sm text-text-secondary">Frontend Developer</p>
      </div>
    </div>
  ),
};

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    src: 'https://github.com/ppyom.png',
    alt: 'Playground Avatar',
    fallback: 'P',
    size: 'md',
  },
};
