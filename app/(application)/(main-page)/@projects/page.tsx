import { getPublicProjects } from '@/database/queries/project';
import PageTitle from '@/components/common/page-title';
import ProjectList from '@/components/application/projects/project-list';

export default async function Page() {
  const projects = await getPublicProjects();

  return (
    <section id="projects" className="py-20 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Projects</PageTitle>
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectList projects={projects} />
        </div>
      </div>
    </section>
  );
}
