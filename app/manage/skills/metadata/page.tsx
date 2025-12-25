import { getSkillMetadata } from '@/database/queries/skill-metadata';
import PageTitle from '@/components/common/page-title';
import MetadataEditForm from '@/components/admin/skills/metadata-edit-form';

export default async function Page() {
  const skillMeta = await getSkillMetadata();

  return (
    <>
      <PageTitle align="left">스킬 메타데이터 관리</PageTitle>
      <MetadataEditForm skillMetadata={skillMeta} />
    </>
  );
}
