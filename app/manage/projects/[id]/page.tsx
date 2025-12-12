import { notFound } from 'next/navigation';
import PageTitle from '@/components/page-title';
import ProjectEditForm from '@/components/admin/projects/project-edit-form';
import { getProject } from '@/database/queries/project';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const [project] = await getProject.execute({ projectId: id });

  if (!project) {
    return notFound();
  }

  return (
    <>
      <PageTitle align="left">프로젝트 수정</PageTitle>
      <ProjectEditForm defaultProject={project} />
    </>
  );
}
