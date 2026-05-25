import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ImageUpload } from './image-upload';
import { ImageUploadTrigger } from './image-upload-trigger';
import { ImageUploadPreview } from './image-upload-preview';

const meta: Meta<typeof ImageUpload> = {
  title: 'ui/image-upload',
  component: ImageUpload,
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ImageUpload>;

function Template(args: React.ComponentProps<typeof ImageUpload>) {
  return (
    <ImageUpload {...args}>
      <div className="space-y-4">
        <ImageUploadTrigger />
        <ImageUploadPreview />
      </div>
    </ImageUpload>
  );
}

/**
 * Default
 */
export const Default: Story = {
  render: Template,
};

/**
 * Multiple
 */
export const Multiple: Story = {
  render: Template,
  args: {
    multiple: true,
  },
};

/**
 * With Existing Images
 */
export const WithExistingImages: Story = {
  render: Template,
  args: {
    multiple: true,
    defaultFiles: [
      {
        id: '1',
        url: 'https://github.com/ppyom.png',
      },
      {
        id: '2',
        url: 'https://github.com/ppyom.png',
      },
    ],
  },
};

/**
 * Disabled
 */
export const Disabled: Story = {
  render: Template,
  args: {
    disabled: true,
    multiple: true,
    defaultFiles: [
      {
        id: '1',
        url: 'https://github.com/ppyom.png',
      },
    ],
  },
};

/**
 * Composition
 */
export const Composition: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">프로젝트 썸네일</h3>

        <ImageUpload
          defaultFiles={[
            {
              id: '1',
              url: 'https://github.com/ppyom.png',
            },
          ]}
        >
          <div className="space-y-4">
            <ImageUploadTrigger />
            <ImageUploadPreview />
          </div>
        </ImageUpload>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-medium">시연 이미지</h3>

        <ImageUpload
          multiple
          defaultFiles={[
            {
              id: '2',
              url: 'https://github.com/ppyom.png',
            },
            {
              id: '3',
              url: 'https://github.com/ppyom.png',
            },
          ]}
        >
          <div className="space-y-4">
            <ImageUploadTrigger />
            <ImageUploadPreview />
          </div>
        </ImageUpload>
      </div>
    </div>
  ),
};
