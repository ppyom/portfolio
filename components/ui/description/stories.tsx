import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Description } from './description';

const meta: Meta<typeof Description> = {
  title: 'ui/description',
  component: Description,
  tags: ['!dev'],
};

export default meta;

type Story = StoryObj<typeof Description>;

/**
 * Default Description
 */
export const Default: Story = {
  args: {
    children: '입력에 대한 추가 안내 텍스트입니다.',
  },
};

/**
 * States
 */
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Description {...args}>기본 설명 텍스트입니다.</Description>

      <Description {...args}>
        여러 줄로 작성될 경우 자연스럽게 줄바꿈되어 읽기 쉬운 형태를 유지합니다.
      </Description>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Description',
  },
};
