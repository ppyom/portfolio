import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Description } from '@/components/ui/description';
import { ErrorMessage } from '@/components/ui/error-message';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { Field } from './field';

const meta: Meta<typeof Field> = {
  title: 'ui/field',
  component: Field,
  tags: ['!dev'],
  argTypes: {
    disabled: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    invalid: {
      control: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
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

type Story = StoryObj<typeof Field>;

/**
 * Default Field
 */
export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <Label htmlFor="email">이메일</Label>
      <Input id="email" placeholder="이메일을 입력해주세요" />
    </Field>
  ),
};

/**
 * Variants
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Field>
        <Label htmlFor="default">Default</Label>
        <Input id="default" placeholder="기본 상태" />
      </Field>

      <Field required>
        <Label htmlFor="required" required>
          Required
        </Label>
        <Input id="required" placeholder="필수 입력" />
      </Field>

      <Field invalid>
        <Label htmlFor="invalid">Invalid</Label>
        <Input id="invalid" variant="error" placeholder="오류 상태" />
      </Field>
    </div>
  ),
};

/**
 * States
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Field disabled>
        <Label htmlFor="disabled">Disabled</Label>
        <Input id="disabled" disabled placeholder="비활성화 상태" />
      </Field>

      <Field>
        <Label htmlFor="textarea">Textarea</Label>
        <Textarea id="textarea" placeholder="내용을 입력해주세요" />
      </Field>
    </div>
  ),
};

/**
 * Composition
 */
export const Composition: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <Field>
        <Label htmlFor="email">이메일</Label>

        <Description>회사 이메일을 입력해주세요.</Description>

        <Input id="email" placeholder="이메일을 입력해주세요" />
      </Field>

      <Field invalid>
        <Label required htmlFor="password">
          비밀번호
        </Label>

        <Input
          id="password"
          type="password"
          variant="error"
          placeholder="비밀번호 입력"
        />

        <ErrorMessage>비밀번호는 8자 이상이어야 합니다.</ErrorMessage>
      </Field>

      <Field invalid>
        <Label required htmlFor="bio">
          자기소개
        </Label>

        <Description>최대 300자까지 입력 가능합니다.</Description>

        <Textarea
          id="bio"
          variant="error"
          placeholder="자기소개를 입력해주세요"
        />

        <ErrorMessage>입력 가능 글자 수를 초과했습니다.</ErrorMessage>
      </Field>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    disabled: false,
    invalid: false,
    required: false,
  },
  render: (args) => (
    <Field {...args}>
      <Label htmlFor="playground" required={args.required}>
        Label
      </Label>

      <Input
        id="playground"
        disabled={args.disabled}
        variant={args.invalid ? 'error' : 'default'}
        placeholder="Playground"
      />
    </Field>
  ),
};
