import type { FormDataType } from '@/lib/validation/project.schema';
import type { ImageItem } from '@/types/image';
import type { Project } from '@/types/project';

function splitImages(images: ImageItem[]) {
  return {
    remote: images.filter(
      (image): image is Extract<ImageItem, { type: 'remote' }> =>
        image.type === 'remote',
    ),

    files: images
      .filter(
        (image): image is Extract<ImageItem, { type: 'local' }> =>
          image.type === 'local',
      )
      .map((image) => image.file),
  };
}

export function createProjectPayload(data: FormDataType) {
  const cover = splitImages(data.coverImage);
  const images = splitImages(data.images);

  return {
    ...data,

    coverImage: cover.remote,
    coverImageFile: cover.files,

    images: images.remote,
    imageFiles: images.files,
  };
}

export function createProjectDefaultValues(project?: Project): FormDataType {
  return {
    title: project?.title || '',
    isPublic: project?.isPublic ?? true,
    description: project?.description || '',
    category: project?.category || '',
    githubUrl: project?.githubUrl || '',
    applicationUrl: project?.applicationUrl || '',
    tags: project?.tags || [],
    overview: project?.overview || '',
    features: project?.features ?? [],
    goals: project?.goals || [],
    results: project?.results || [],
    member: project?.member || {
      size: 1,
      role: '',
      responsibilities: [],
    },
    techStacks:
      project?.techStacks.map((item) => ({
        title: item.title ?? '',
        stacks: item.stacks ?? [],
      })) ?? [],
    coverImage: project?.coverImage
      ? [
          {
            ...project.coverImage,
            type: 'remote',
            deleted: false,
          },
        ]
      : [],
    images:
      (project?.images ?? []).map((image) => ({
        ...image,
        type: 'remote',
        deleted: false,
      })) ?? [],
  };
}
