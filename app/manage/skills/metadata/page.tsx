import type { Metadata } from 'next';

import { getSkillMetadata } from '@/services/skills';
import PageTitle from '@/components/common/page-title';
import { SkillMetadataEditForm } from '@/components/admin/skills/skill-metadata-edit-form';

export const metadata: Metadata = {
  title: '스킬 메타데이터 관리',
};

export default async function Page() {
  const skillMeta = await getSkillMetadata();

  return (
    <>
      <PageTitle align="left">스킬 메타데이터 관리</PageTitle>
      <SkillMetadataEditForm skillMetadata={skillMeta} />
    </>
  );
}
