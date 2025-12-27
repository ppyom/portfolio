import { getPublicProjects } from '@/database/queries/project';

import ProjectCard from './project-card';

export default async function ProjectList() {
  const projects = await getPublicProjects.execute();

  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </>
  );
}
