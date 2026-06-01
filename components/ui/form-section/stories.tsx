import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PlusIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DraggableItem,
  DraggableList,
  DragHandle,
} from '@/components/ui/draggable-list';
import { Field } from '@/components/ui/field';
import {
  ImageUpload,
  ImageUploadPreview,
  ImageUploadTrigger,
} from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

import { FormSection } from './form-section';

const meta: Meta<typeof FormSection> = {
  title: 'ui/form-section',
  component: FormSection,
  tags: [],
};

export default meta;

type Story = StoryObj<typeof FormSection>;

function Template(args: React.ComponentProps<typeof FormSection>) {
  return <FormSection {...args} />;
}

/**
 * Default
 */
export const Default: Story = {
  render: Template,
  args: {
    title: '프로젝트 기본 정보',
    children: <div className="rounded-md border p-4">Form Content</div>,
  },
};

/**
 * With Description
 */
export const WithDescription: Story = {
  render: Template,
  args: {
    title: '프로젝트 기본 정보',
    description: '프로젝트에 대한 기본 정보를 입력해주세요.',
    children: <div className="rounded-md border p-4">Form Content</div>,
  },
};

/**
 * Long Content
 */
export const LongContent: Story = {
  render: Template,
  args: {
    title: '기술 스택',
    description: '사용한 기술 스택을 입력해주세요.',
    children: (
      <div className="space-y-4">
        <div className="h-12 rounded-md border" />
        <div className="h-12 rounded-md border" />
        <div className="h-12 rounded-md border" />
        <div className="h-12 rounded-md border" />
      </div>
    ),
  },
};

function ProjectFormExample() {
  const [features, setFeatures] = useState([
    {
      id: '1',
      value: 'feature 1',
    },
    {
      id: '2',
      value: 'feature 2',
    },
    {
      id: '3',
      value: 'feature 3',
    },
  ]);

  return (
    <div className="max-w-3xl space-y-6">
      <FormSection
        className="relative"
        title="프로젝트 기본 정보"
        description="프로젝트에 대한 기본 정보를 입력해주세요."
      >
        <Field className="absolute top-6 right-6 flex-row items-center">
          <Label htmlFor="isPublic">공개 여부</Label>
          <Switch id="isPublic" />
        </Field>
        <div className="space-y-3">
          <Field required>
            <Label htmlFor="title" required>
              프로젝트 제목
            </Label>
            <Input id="title" />
          </Field>
          <Field>
            <Label htmlFor="description">프로젝트 한 줄 소개</Label>
            <Input id="description" />
          </Field>
          <Field>
            <Label>커버 이미지</Label>
            <ImageUpload>
              <ImageUploadTrigger />
              <ImageUploadPreview />
            </ImageUpload>
          </Field>
        </div>
      </FormSection>

      <FormSection
        title="프로젝트 개요"
        description="프로젝트를 간단히 소개해주세요."
      >
        <Textarea className="w-full" />
      </FormSection>

      <FormSection
        className="pb-4"
        title="주요 기능"
        description="프로젝트의 주요 기능을 작성해주세요."
      >
        <div className="space-y-2">
          <DraggableList
            items={features}
            getId={(item) => item.id}
            onChange={setFeatures}
          >
            {features.map((feature) => (
              <DraggableItem key={feature.id} id={feature.id}>
                <div className="flex items-center gap-1">
                  <DragHandle />
                  <Input value={feature.value} readOnly className="flex-1" />
                  <Button
                    className="text-semantic-error"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFeatures((prev) =>
                        prev.filter((f) => f.id !== feature.id),
                      );
                    }}
                  >
                    <Trash2Icon size={14} />
                  </Button>
                </div>
              </DraggableItem>
            ))}
          </DraggableList>
        </div>
        <Button
          type="button"
          className="mt-2 w-full gap-2"
          variant="ghost"
          onClick={() => {
            setFeatures((prev) => {
              const id = crypto.randomUUID();
              return [
                ...prev,
                {
                  id,
                  value: `feature${id}`,
                },
              ];
            });
          }}
        >
          <PlusIcon size={14} />
          추가
        </Button>
      </FormSection>
    </div>
  );
}

/**
 * Composition
 */
export const Composition: Story = {
  render: () => <ProjectFormExample />,
};
