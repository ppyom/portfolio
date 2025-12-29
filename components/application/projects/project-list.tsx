import type { Project } from '@/types/project';

import ProjectCard from './project-card';

interface Props {
  projects: Project[];
}

export default async function ProjectList({ projects }: Props) {
  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </>
  );
}
