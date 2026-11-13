import { redirect } from 'next/navigation';
import { hasLocale } from 'next-intl';

import { getProject, getProjectTranslation } from '@/services/project';
import { LanguageTabs } from '@/components/admin/layout';
import { ProjectEditForm } from '@/components/admin/projects/project-edit-form';
import { ProjectTranslationForm } from '@/components/admin/projects/project-translation-form';
import { routing } from '@/i18n/routing';

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lang?: string }>;
}

export default async function Page({ params, searchParams }: Props) {
  const [{ id }, { lang }] = await Promise.all([params, searchParams]);

  // 지원하지 않는 언어는 기본 언어 탭으로 보낸다
  if (lang !== undefined && !hasLocale(routing.locales, lang)) {
    return redirect(`/manage/projects/${id}`);
  }
  const language = lang ?? routing.defaultLocale;

  const project = await getProject(id);

  if (!project) {
    return redirect('/manage/projects/new');
  }

  const isDefaultLanguage = language === routing.defaultLocale;
  const translation = isDefaultLanguage
    ? null
    : await getProjectTranslation(id, language);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <p className="text-2xl font-bold">프로젝트 수정</p>
          <p className="text-text-secondary">
            등록된 프로젝트 정보를 수정합니다.
          </p>
        </div>
      </div>
      <LanguageTabs basePath={`/manage/projects/${id}`} current={language} />
      {isDefaultLanguage ? (
        <ProjectEditForm defaultProject={project} />
      ) : (
        <ProjectTranslationForm
          key={language}
          project={project}
          language={language}
          defaultTranslation={translation}
        />
      )}
    </div>
  );
}
