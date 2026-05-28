import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Description } from '@/components/ui/description';
import { ErrorMessage } from '@/components/ui/error-message';
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';

import { Select } from './select';

const meta: Meta<typeof Select> = {
  title: 'ui/select',
  component: Select,
  tags: ['!dev'],
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    'aria-invalid': {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

/**
 * Default
 */
export const Default: Story = {
  render: (args) => (
    <Select {...args} defaultValue="">
      <option value="" disabled>
        선택해주세요
      </option>
      <option value="react">React</option>
      <option value="next">Next.js</option>
      <option value="vue">Vue</option>
    </Select>
  ),
};

/**
 * Selected
 */
export const Selected: Story = {
  render: (args) => (
    <Select {...args} defaultValue="next">
      <option value="react">React</option>
      <option value="next">Next.js</option>
      <option value="vue">Vue</option>
    </Select>
  ),
};

/**
 * States
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select defaultValue="">
        <option value="" disabled>
          기본 상태
        </option>
      </Select>
      <Select defaultValue="react">
        <option value="react">선택됨</option>
      </Select>
      <Select disabled defaultValue="">
        <option value="" disabled>
          비활성화
        </option>
      </Select>
    </div>
  ),
};

/**
 * Invalid
 */
export const Invalid: Story = {
  render: (args) => (
    <Select {...args} aria-invalid defaultValue="">
      <option value="" disabled>
        선택해주세요
      </option>
      <option value="react">React</option>
    </Select>
  ),
};

/**
 * Composition
 */
export const Composition: Story = {
  render: () => (
    <Field>
      <Label htmlFor="stack" required>
        기술 스택
      </Label>
      <Description>가장 자신 있는 기술을 선택해주세요.</Description>
      <Select id="stack" aria-invalid defaultValue="">
        <option value="" disabled>
          기술 스택을 선택해주세요
        </option>
        <option value="react">React</option>
        <option value="next">Next.js</option>
        <option value="typescript">TypeScript</option>
      </Select>
      <ErrorMessage>기술 스택을 선택해주세요.</ErrorMessage>
    </Field>
  ),
};

/**
 * Playground
 */
export const Playground: Story = {
  render: (args) => (
    <Select {...args} defaultValue="">
      <option value="" disabled>
        선택해주세요
      </option>
      <option value="react">React</option>
      <option value="next">Next.js</option>
      <option value="vue">Vue</option>
    </Select>
  ),
};
