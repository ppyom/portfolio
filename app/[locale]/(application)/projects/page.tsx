import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BookIcon } from 'lucide-react';

import { getFilteredProjects } from '@/services/project';
import { createAlternates } from '@/lib/i18n/alternates';
import { PageHeader } from '@/components/application/layout';
import { ProjectList } from '@/components/application/projects/project-list';
import { SearchForm } from '@/components/application/projects/search-form';
import { Empty } from '@/components/feedback/empty';
import type { ProjectFilter } from '@/types/project';

interface Props {
  searchParams: Promise<ProjectFilter>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Projects');

  return {
    title: t('title'),
    alternates: await createAlternates('/projects'),
  };
}

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams;
  const [projects, t] = await Promise.all([
    getFilteredProjects({ q }),
    getTranslations('Projects'),
  ]);

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      <SearchForm defaultKeyword={q} />
      {projects.length === 0 && <Empty icon={BookIcon} title={t('empty')} />}
      {projects.length > 0 && (
        <div className="flex flex-col gap-4 min-h-[66vh]">
          <ProjectList projects={projects} />
        </div>
      )}
    </main>
  );
}
