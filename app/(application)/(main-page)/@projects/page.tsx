import { BookIcon } from 'lucide-react';

import { getProjects } from '@/services/project';
import ProjectList from '@/components/application/projects/project-list';
import { Empty } from '@/components/feedback/empty';
import PageTitle from '@/components/legacy/page-title';

export default async function Page() {
  const projects = await getProjects({ isPublic: true });

  return (
    <section id="projects" className="py-20 px-6 bg-card/50">
      <div className="max-w-4xl mx-auto space-y-12">
        <PageTitle>Projects</PageTitle>
        {projects.length === 0 && (
          <Empty icon={BookIcon} title="등록된 프로젝트가 없습니다." />
        )}
        {projects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectList projects={projects} />
          </div>
        )}
      </div>
    </section>
  );
}
