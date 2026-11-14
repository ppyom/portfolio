import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { getProjects } from '@/services/project';
import { createAlternates } from '@/lib/i18n/alternates';
import { resolveRequestLocale } from '@/lib/i18n/request-locale';
import { PageHeader } from '@/components/application/layout';
import { ProjectList } from '@/components/application/projects/project-list';
import { ProjectSearch } from '@/components/application/projects/project-search';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await resolveRequestLocale(params);
  const t = await getTranslations('Projects');

  return {
    title: t('title'),
    alternates: await createAlternates('/projects'),
  };
}

export default async function Page({ params }: Props) {
  const locale = await resolveRequestLocale(params);
  const [projects, t] = await Promise.all([
    getProjects({ isPublic: true, language: locale }),
    getTranslations('Projects'),
  ]);

  return (
    <main className="max-w-4xl mx-auto p-4 space-y-6">
      <PageHeader title={t('title')} description={t('description')} />
      {/* useSearchParams는 정적 렌더링 시 Suspense 경계가 필요하다. 그 전까지는 전체 목록을 보여준다 */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-4 min-h-[66vh]">
            <ProjectList projects={projects} />
          </div>
        }
      >
        <ProjectSearch projects={projects} />
      </Suspense>
    </main>
  );
}
