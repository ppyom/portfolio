import Link from 'next/link';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/common/page-title';
import ProjectList from '@/components/admin/projects/project-list';
import { getProjects } from '@/database/queries/project';

export default async function Page() {
  const projects = await getProjects.execute();

  return (
    <>
      <PageTitle align="left">프로젝트 관리</PageTitle>
      <Button asChild>
        <Link href="/manage/projects/new">
          <PlusIcon />
          프로젝트 추가
        </Link>
      </Button>
      <ProjectList projects={projects} />
    </>
  );
}
