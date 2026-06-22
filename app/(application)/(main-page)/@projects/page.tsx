import { BookIcon } from 'lucide-react';

import { getProjects } from '@/services/project';
import { Section, SectionTitle } from '@/components/ui/section';
import { ProjectList } from '@/components/application/projects/project-list';
import { Empty } from '@/components/feedback/empty';

export default async function Page() {
  const projects = await getProjects({ isPublic: true });

  return (
    <Section id="projects" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-3 text-center">
        <SectionTitle className="text-3xl">Projects</SectionTitle>
        <p className="text-text-muted">진행한 프로젝트입니다.</p>
      </div>
      {projects.length === 0 && (
        <Empty icon={BookIcon} title="등록된 프로젝트가 없습니다." />
      )}
      {projects.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectList projects={projects} />
        </div>
      )}
    </Section>
  );
}
