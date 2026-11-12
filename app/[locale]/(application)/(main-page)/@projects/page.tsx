import { getTranslations } from 'next-intl/server';
import { BookIcon } from 'lucide-react';

import { getProjects } from '@/services/project';
import { Section, SectionTitle } from '@/components/ui/section';
import { ProjectList } from '@/components/application/projects/project-list';
import { Empty } from '@/components/feedback/empty';

export default async function Page() {
  const [projects, t, tProjects] = await Promise.all([
    getProjects({ isPublic: true }),
    getTranslations('Home.projects'),
    getTranslations('Projects'),
  ]);

  return (
    <Section id="projects" className="py-20 px-6 max-w-4xl mx-auto space-y-12">
      <div className="space-y-3 text-center">
        <SectionTitle className="text-3xl">{t('title')}</SectionTitle>
        <p className="text-text-muted">{t('description')}</p>
      </div>
      {projects.length === 0 && (
        <Empty icon={BookIcon} title={tProjects('empty')} />
      )}
      {projects.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8">
          <ProjectList projects={projects} />
        </div>
      )}
    </Section>
  );
}
