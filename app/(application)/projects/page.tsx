import { getFilteredProjects } from '@/database/queries/project';
import PageTitle from '@/components/common/page-title';
import ProjectList from '@/components/application/projects/project-list';
import SearchForm from '@/components/application/projects/search-form';
import type { ProjectFilter } from '@/types/project';

interface Props {
  searchParams: Promise<ProjectFilter>;
}

export default async function Page({ searchParams }: Props) {
  const { q } = await searchParams;
  const projects = await getFilteredProjects(q);

  return (
    <>
      <PageTitle align="left">프로젝트 목록</PageTitle>
      <SearchForm defaultKeyword={q} />
      <div className="flex flex-col gap-4 min-h-[66vh]">
        <ProjectList projects={projects} />
      </div>
    </>
  );
}
