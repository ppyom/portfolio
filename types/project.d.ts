import { ProjectTable, TechStackTable } from '@/database/types';

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

export interface Project extends ProjectTable.Select {
  techStacks: TechStackTable.Select[];
}
