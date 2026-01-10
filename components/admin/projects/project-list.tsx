import type { Project } from '@/types/project';

import ProjectCard from './project-card';

interface Props {
  projects: Project[];
}

export default function ProjectList({ projects }: Props) {
  return (
    <ul className="space-y-4">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
