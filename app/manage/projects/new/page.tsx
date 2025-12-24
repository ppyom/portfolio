import PageTitle from '@/components/common/page-title';

import ProjectEditForm from '@/components/admin/projects/project-edit-form';

export default function Page() {
  return (
    <>
      <PageTitle align="left">프로젝트 추가</PageTitle>
      <ProjectEditForm />
    </>
  );
}
