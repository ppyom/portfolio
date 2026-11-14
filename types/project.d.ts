import {
  FileTable,
  ProjectTable,
  ProjectTranslationTable,
  TechStackTable,
} from '@/database/types/project';
import type { ImageItem } from '@/types/image';

export interface ImageFile {
  id: FileTable.Select.id;
  url: FileTable.Select.url;
}

export interface Project extends Omit<
  ProjectTable.Select,
  'coverImageId' | 'imageIds'
> {
  coverImage: ImageFile | null;
  images: ImageFile[];
  techStacks: TechStackTable.Select[];
}

export interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  githubUrl: string;
  applicationUrl: string;
  overview: string;
  isPublic: boolean;
  coverImage: Extract<ImageItem, { type: 'remote' }>[];
  coverImageFile: File[];
  images: Extract<ImageItem, { type: 'remote' }>[];
  imageFiles: File[];
  tags: Project['tags'];
  features: Project['features'];
  goals: Project['goals'];
  results: Project['results'];
  member: Project['member'];
  techStacks: Project['techStacks'];
}

// 번역 저장 입력값. 비운 필드는 한국어 원본을 쓴다
export type ProjectTranslationData = Pick<
  ProjectTranslationTable.Insert,
  | 'title'
  | 'description'
  | 'category'
  | 'overview'
  | 'features'
  | 'goals'
  | 'results'
  | 'member'
>;

export type ProjectTranslation = ProjectTranslationTable.Select;

