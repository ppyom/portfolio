import PageTitle from '@/components/page-title';
import ProjectCard from '@/components/project-card';
import { projects } from '@/lib/constants/projects';

export default function Page() {
  return (
    <section id="Projects" className="py-20 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto space-y-12 slide-up">
        <PageTitle>Projects</PageTitle>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
