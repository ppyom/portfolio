export interface Project {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  body: string;
  github_url?: string;
  application_url?: string;
}
