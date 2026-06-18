import { BookIcon } from 'lucide-react';

import { getFilteredProjects } from '@/services/project';
import { PageHeader } from '@/components/application/layout';
import { ProjectList } from '@/components/application/projects/project-list';
import { SearchForm } from '@/components/application/projects/search-form';
import { Empty } from '@/components/feedback/empty';
import type { ProjectFilter } from '@/types/project';

interface Props {
  searchParams: Promise<ProjectFilter>;
}

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams;
  const projects = await getFilteredProjects({ q });

  return (
    <>
      <PageHeader
        title="프로젝트 목록"
        description="진행했던 프로젝트들을 정리했습니다."
      />
      <SearchForm defaultKeyword={q} />
      {projects.length === 0 && (
        <Empty icon={BookIcon} title="등록된 프로젝트가 없습니다." />
      )}
      {projects.length > 0 && (
        <div className="flex flex-col gap-4 min-h-[66vh]">
          <ProjectList projects={projects} />
        </div>
      )}
    </>
  );
}
