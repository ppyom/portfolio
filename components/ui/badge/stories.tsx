import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'ui/badge',
  component: Badge,
  tags: ['!dev'],
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [
        'primary',
        'secondary',
        'info',
        'success',
        'warning',
        'error',
        'muted',
      ],
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: {
          summary: 'md',
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

/**
 * Default
 */
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

/**
 * Variants
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="muted">Muted</Badge>
    </div>
  ),
};

/**
 * Sizes
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

/**
 * Composition
 */
export const Composition: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">포트폴리오 프로젝트</span>
        <Badge variant="success">Published</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">관리자 설정</span>
        <Badge variant="warning">Draft</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">API 문서</span>
        <Badge variant="info">Updated</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">레거시 문서</span>
        <Badge variant="muted">Archived</Badge>
      </div>
    </div>
  ),
};

/**
 * Playground
 */
export const Playground: Story = {
  args: {
    children: 'Badge',
    variant: 'primary',
    size: 'md',
  },
};
