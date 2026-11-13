'use client';

import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { BookIcon } from 'lucide-react';

import { filterProjects } from '@/lib/utils/filter-projects';
import { Empty } from '@/components/feedback/empty';
import type { Project } from '@/types/project';

import { ProjectList } from './project-list';
import { SearchForm } from './search-form';

interface Props {
  projects: Project[];
}

// 페이지를 정적으로 렌더링하기 위해 검색(?q=)은 서버 searchParams가 아니라 클라이언트에서 거른다
export function ProjectSearch({ projects }: Props) {
  const t = useTranslations('Projects');
  const q = useSearchParams().get('q') ?? '';
  const filtered = filterProjects(projects, q);

  return (
    <>
      <SearchForm key={q} defaultKeyword={q} />
      {filtered.length === 0 && <Empty icon={BookIcon} title={t('empty')} />}
      {filtered.length > 0 && (
        <div className="flex flex-col gap-4 min-h-[66vh]">
          <ProjectList projects={filtered} />
        </div>
      )}
    </>
  );
}
