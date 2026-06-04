import { redirect } from 'next/navigation';

import { getProject } from '@/services/project';
import { ProjectEditForm } from '@/components/admin/projects/project-edit-form';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const project = await getProject(id);

  if (!project) {
    return redirect('/manage/projects/new');
  }

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
      <ProjectEditForm defaultProject={project} />
    </div>
  );
}
