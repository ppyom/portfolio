import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  CopyIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { DropdownContent } from './dropdown-content';
import { DropdownItem } from './dropdown-item';
import { DropdownMenu } from './dropdown-menu';
import { DropdownSeparator } from './dropdown-separator';
import { DropdownTrigger } from './dropdown-trigger';

const meta: Meta<typeof DropdownMenu> = {
  title: 'ui/dropdown-menu',
  component: DropdownMenu,
  tags: ['!dev'],
  argTypes: {
    defaultOpen: {
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

type Story = StoryObj<typeof DropdownMenu>;

/**
 * Default
 */
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownTrigger>
        <Button>메뉴 열기</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>수정</DropdownItem>
        <DropdownItem>복제</DropdownItem>
        <DropdownSeparator />
        <DropdownItem variant="destructive">삭제</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  ),
};

/**
 * Variants
 */
export const Variants: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownTrigger>
        <Button>Item Variants</Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Default</DropdownItem>
        <DropdownItem disabled>Disabled</DropdownItem>
        <DropdownItem variant="destructive">Destructive</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  ),
};

/**
 * Placement
 */
export const Placement: Story = {
  render: () => {
    const sides = ['top', 'bottom', 'left', 'right'] as const;
    const aligns = ['start', 'center', 'end'] as const;

    return (
      <div className="grid grid-cols-3 gap-y-24 gap-x-8 p-16 justify-items-center">
        {sides.map((side) =>
          aligns.map((align) => (
            <DropdownMenu key={`${side}-${align}`} defaultOpen>
              <DropdownTrigger>
                <Button className="w-32 text-xs">
                  {side} / {align}
                </Button>
              </DropdownTrigger>
              <DropdownContent side={side} align={align}>
                <DropdownItem>Menu Item</DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          )),
        )}
      </div>
    );
  },
};

/**
 * Composition
 */
export const Composition: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownTrigger>
        <Button variant="ghost">
          <MoreHorizontalIcon size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>
          <PencilIcon size={14} />
          수정
        </DropdownItem>
        <DropdownItem>
          <CopyIcon size={14} />
          복제
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem variant="destructive">
          <Trash2Icon size={14} />
          삭제
        </DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  ),
};
