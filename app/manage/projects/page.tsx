import type { Metadata } from 'next';
import Link from 'next/link';
import { BookIcon, PlusIcon } from 'lucide-react';

import { getProjects } from '@/services/project';
import { Button } from '@/components/ui/button';
import Empty from '@/components/common/empty';
import PageTitle from '@/components/common/page-title';
import ProjectList from '@/components/admin/projects/project-list';

export const metadata: Metadata = {
  title: '프로젝트 관리',
};

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      <PageTitle align="left">프로젝트 관리</PageTitle>
      {projects.length === 0 && (
        <Empty
          icon={BookIcon}
          title="등록된 프로젝트가 없습니다."
          description="프로젝트를 추가해 포트폴리오를 구성해보세요."
        >
          <Button asChild>
            <Link href="/manage/projects/new">
              <PlusIcon />
              새로운 프로젝트 추가하기
            </Link>
          </Button>
        </Empty>
      )}
      {projects.length > 0 && (
        <>
          <Button asChild>
            <Link href="/manage/projects/new">
              <PlusIcon />
              프로젝트 추가
            </Link>
          </Button>
          <ProjectList projects={projects} />
        </>
      )}
    </>
  );
}
