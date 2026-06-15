import type { Metadata } from 'next';
import Link from 'next/link';
import { BookIcon, PlusIcon } from 'lucide-react';

import { getProjects } from '@/services/project';
import { Button } from '@/components/ui/button';
import { ProjectList } from '@/components/admin/projects/project-list';
import { Empty } from '@/components/feedback/empty';

export const metadata: Metadata = {
  title: '프로젝트 관리',
};

export default async function Page() {
  const projects = await getProjects();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <p className="text-2xl font-bold">프로젝트 관리</p>
          <p className="text-text-secondary">
            포트폴리오에 표시될 프로젝트를 관리하고 순서를 정렬할 수 있습니다.
          </p>
        </div>
        <Button>
          <Link href="/manage/projects/new" className="flex gap-2 items-center">
            <PlusIcon size={14} />
            프로젝트 추가
          </Link>
        </Button>
      </div>
      {projects.length === 0 && (
        <Empty
          icon={BookIcon}
          title="등록된 프로젝트가 없습니다."
          description="프로젝트를 추가해 포트폴리오를 구성해보세요."
        >
          <Button>
            <Link
              className="flex items-center gap-2"
              href="/manage/projects/new"
            >
              <PlusIcon size={14} />
              새로운 프로젝트 추가하기
            </Link>
          </Button>
        </Empty>
      )}
      {projects.length > 0 && <ProjectList projects={projects} />}
    </div>
  );
}
