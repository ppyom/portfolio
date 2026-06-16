import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { MenuIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Sheet } from './sheet';
import { SheetClose } from './sheet-close';
import { SheetContent } from './sheet-content';
import { SheetTrigger } from './sheet-trigger';

const meta: Meta<typeof Sheet> = {
  title: 'ui/sheet',
  component: Sheet,
  tags: [],
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

type Story = StoryObj<typeof Sheet>;

function CompositionStory() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button className="gap-2">
          <MenuIcon size={14} />
          메뉴 열기
        </Button>
      </SheetTrigger>
      <SheetContent className="w-80 p-4">
        <div className="flex items-center justify-between">
          <p className="ml-2 font-bold">메뉴</p>

          <SheetClose>
            <Button variant="ghost" size="sm">
              <XIcon size={14} />
            </Button>
          </SheetClose>
        </div>
        <nav className="mt-6 flex flex-col gap-2">
          <Button variant="ghost">Home</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Projects</Button>
          <Button variant="ghost">Contact</Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button>열기</Button>
      </SheetTrigger>

      <SheetContent className="w-80 p-6">Sheet Content</SheetContent>
    </Sheet>
  ),
};

export const Composition: Story = {
  render: () => <CompositionStory />,
};
