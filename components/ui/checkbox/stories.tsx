import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Checkbox } from './checkbox';
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Description } from '@/components/ui/description';
import { ErrorMessage } from '@/components/ui/error-message';

const meta: Meta<typeof Checkbox> = {
  title: 'ui/checkbox',
  component: Checkbox,
  tags: ['autodocs'],
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

type Story = StoryObj<typeof Checkbox>;

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
      <Checkbox />

      <Checkbox checked readOnly />

      <Checkbox disabled />

      <Checkbox checked disabled readOnly />
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
 * Composition
 */
export const Composition: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Field>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">약관에 동의합니다</Label>
        </div>

        <Description>서비스 이용을 위해 동의가 필요합니다.</Description>
      </Field>

      <Field invalid>
        <div className="flex items-center gap-2">
          <Checkbox id="privacy" aria-invalid />
          <Label required htmlFor="privacy">
            개인정보 수집 동의
          </Label>
        </div>

        <ErrorMessage>필수 동의 항목입니다.</ErrorMessage>
      </Field>

      <Field disabled>
        <div className="flex items-center gap-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled">비활성 상태</Label>
        </div>
      </Field>
    </div>
  ),
};

/**
 * Playground
 */
export const Playground: Story = {
  args: {},
};
