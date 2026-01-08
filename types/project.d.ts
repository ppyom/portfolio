import {
  FileTable,
  ProjectTable,
  TechStackTable,
} from '@/database/types/project';

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
  coverImageFile: File[];
  imageFiles: File[];
  tags: Project['tags'];
  features: Project['features'];
  goals: Project['goals'];
  results: Project['results'];
  member: Project['member'];
  techStacks: Project['techStacks'];
  existedCoverImage: (ImageFile & { deleted: boolean })[];
  existedImages: (ImageFile & { deleted: boolean })[];
}

export interface ProjectFilter {
  q?: string;
}
