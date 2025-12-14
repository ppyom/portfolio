import ProjectCard from '@/components/project-card';
import { getProjects } from '@/database/queries/project';

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
