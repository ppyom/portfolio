import type { Metadata } from 'next';

import { getSkillMetadata } from '@/services/skills';
import { SkillMetadataEditForm } from '@/components/admin/skills/skill-metadata-edit-form';

export const metadata: Metadata = {
  title: '스킬 메타데이터 관리',
};

export default async function Page() {
  const skillMeta = await getSkillMetadata();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8">
      <div className="flex-1 space-y-2">
        <p className="text-2xl font-bold">스킬 메타데이터 관리</p>
        <p className="text-text-secondary">
          기술 스택에 표시될 색상 정보를 관리합니다.
        </p>
      </div>
      <SkillMetadataEditForm skillMetadata={skillMeta} />
    </div>
  );
}
