import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Radio } from './radio';
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Description } from '@/components/ui/description';
import { ErrorMessage } from '@/components/ui/error-message';

const meta: Meta<typeof Radio> = {
  title: 'ui/radio',
  component: Radio,
  tags: ['!dev'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    'aria-invalid': {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Radio>;

/**
 * Default
 */
export const Default: Story = {
  args: {},
};

/**
 * Checked
 */
export const Checked: Story = {
  args: {
    checked: true,
    readOnly: true,
  },
};

/**
 * States
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Radio />

      <Radio checked readOnly />

      <Radio disabled />

      <Radio checked disabled readOnly />
    </div>
  ),
};

/**
 * Invalid
 */
export const Invalid: Story = {
  args: {
    'aria-invalid': true,
  },
};

/**
 * Group
 */
export const Group: Story = {
  render: () => (
    <Field>
      <Description>알림 수신 방식을 선택해주세요.</Description>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Radio id="email" name="notification" defaultChecked />
          <Label htmlFor="email">이메일</Label>
        </div>

        <div className="flex items-center gap-2">
          <Radio id="sms" name="notification" />
          <Label htmlFor="sms">문자</Label>
        </div>

        <div className="flex items-center gap-2">
          <Radio id="push" name="notification" />
          <Label htmlFor="push">푸시 알림</Label>
        </div>
      </div>
    </Field>
  ),
};

/**
 * Composition
 */
export const Composition: Story = {
  render: () => (
    <Field invalid>
      <Description>하나를 반드시 선택해야 합니다.</Description>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Radio id="basic" name="plan" />
          <Label htmlFor="basic">Basic</Label>
        </div>

        <div className="flex items-center gap-2">
          <Radio id="pro" name="plan" />
          <Label required htmlFor="pro">
            Pro
          </Label>
        </div>
      </div>

      <ErrorMessage>플랜을 선택해주세요.</ErrorMessage>
    </Field>
  ),
};

/**
 * Playground
 */
export const Playground: Story = {
  args: {},
};
