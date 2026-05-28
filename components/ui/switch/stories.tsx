import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Description } from '@/components/ui/description';
import { ErrorMessage } from '@/components/ui/error-message';
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';

import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'ui/switch',
  component: Switch,
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

type Story = StoryObj<typeof Switch>;

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
      <Switch />

      <Switch checked readOnly />

      <Switch disabled />

      <Switch checked disabled readOnly />
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
 * Settings
 */
export const Settings: Story = {
  render: () => (
    <Field>
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <Label htmlFor="notifications">알림 수신</Label>

          <Description>새로운 소식을 이메일로 받아봅니다.</Description>
        </div>

        <Switch id="notifications" defaultChecked />
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
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <Label required htmlFor="privacy">
            개인정보 공개
          </Label>

          <Description>프로필 공개 여부를 설정합니다.</Description>
        </div>

        <Switch id="privacy" />
      </div>

      <ErrorMessage>필수 설정 항목입니다.</ErrorMessage>
    </Field>
  ),
};

/**
 * Playground
 */
export const Playground: Story = {
  args: {},
};
