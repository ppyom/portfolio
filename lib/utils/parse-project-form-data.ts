import type { Project, ProjectFormData } from '@/types/project';

/**
 * 프로젝트 관리 form의 FormData를 서버에서 사용 가능한 Project 구조로 변환하는 파서 함수
 * @param formData
 */
export function parseProjectFormData(formData: FormData): ProjectFormData {
  const getString = (key: string) => formData.get(key) as string;
  const getBoolean = (key: string) => formData.get(key) === 'true';
  const getFiles = (key: string) => formData.getAll(key) as File[];
  const parseJSON = <T>(key: string): T =>
    JSON.parse(formData.get(key) as string);

  return {
    title: getString('title'),
    description: getString('description'),
    category: getString('category'),
    githubUrl: getString('githubUrl'),
    applicationUrl: getString('applicationUrl'),
    overview: getString('overview'),

    isPublic: getBoolean('isPublic'),

    coverImage: parseJSON('coverImage') ?? [],
    coverImageFile: getFiles('coverImageFile') ?? [],
    images: parseJSON('images') ?? [],
    imageFiles: getFiles('imageFiles') ?? [],

    tags: parseJSON<Project['tags']>('tags') ?? [],
    features: parseJSON<Project['features']>('features') ?? [],
    goals: parseJSON<Project['goals']>('goals') ?? [],
    results: parseJSON<Project['results']>('results') ?? [],
    member: parseJSON<Project['member']>('member'),
    techStacks: parseJSON<Project['techStacks']>('techStacks') ?? [],
  };
}
