import ProjectCard from '@/components/project-card';
import { getProjects } from '@/lib/api/projects';

export default async function ProjectList() {
  const projects = await getProjects();
  return (
    <>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </>
  );
}
