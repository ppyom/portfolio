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

export interface ProjectFilter {
  q?: string;
}
