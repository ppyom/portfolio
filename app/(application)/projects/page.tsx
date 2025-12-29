import { getPublicProjects } from '@/database/queries/project';
import PageTitle from '@/components/common/page-title';
import ProjectList from '@/components/application/projects/project-list';

export default async function Page() {
  const projects = await getPublicProjects();

  return (
    <>
      <PageTitle align="left">프로젝트 목록</PageTitle>
      <div className="flex flex-col gap-4">
        <ProjectList projects={projects} />
      </div>
    </>
  );
}
