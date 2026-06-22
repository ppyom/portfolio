import { ProjectEditForm } from '@/components/admin/projects/project-edit-form';

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <p className="text-2xl font-bold">프로젝트 작성</p>
          <p className="text-text-secondary">
            새로운 프로젝트를 등록하고 포트폴리오에 표시할 정보를 입력합니다.
          </p>
        </div>
      </div>
      <ProjectEditForm />
    </div>
  );
}
