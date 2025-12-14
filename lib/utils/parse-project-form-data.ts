import type { ImageFile, Project } from '@/types/project';

export function parseProjectFormData(formData: FormData) {
  const getString = (key: string) => formData.get(key) as string;
  const getFiles = (key: string) => formData.getAll(key) as File[];
  const parseJSON = <T>(key: string): T =>
    JSON.parse(formData.get(key) as string);
  const parseExistingImages = parseJSON<(ImageFile & { deleted: boolean })[]>;

  return {
    title: getString('title'),
    description: getString('description'),
    category: getString('category'),
    githubUrl: getString('githubUrl'),
    applicationUrl: getString('applicationUrl'),
    overview: getString('overview'),

    coverImageFile: getFiles('coverImageFile'),
    imageFiles: getFiles('imageFiles'),

    tags: parseJSON<Project['tags']>('tags'),
    features: parseJSON<Project['features']>('features'),
    goals: parseJSON<Project['goals']>('goals'),
    results: parseJSON<Project['results']>('results'),
    member: parseJSON<Project['member']>('member'),
    techStacks: parseJSON<Project['techStacks']>('techStacks'),

    existedCoverImage: parseExistingImages('existedCoverImage'),
    existedImages: parseExistingImages('existedImages'),
  };
}
