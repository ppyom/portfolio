import { getProjects } from '@/database/queries/project';
import ProjectCard from './project-card';

export default async function ProjectList() {
  const projects = await getProjects.execute();

  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </>
  );
}
