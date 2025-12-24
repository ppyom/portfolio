import {
  FileTable,
  ProjectTable,
  TechStackTable,
} from '@/database/types/project';

/**
 * @deprecated
 */
export interface ProjectLegacy {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  body: string;
  github_url?: string;
  application_url?: string;
}

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
