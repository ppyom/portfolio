import type { Metadata } from 'next';

import { getProfile } from '@/services/profile';
import { ProfileEditForm } from '@/components/admin/profile/profile-edit-form';

export const metadata: Metadata = {
  title: '프로필 관리',
};

export default async function Page() {
  const profile = await getProfile();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8">
      <div className="flex-1 space-y-2">
        <p className="text-2xl font-bold">프로젝트 관리</p>
        <p className="text-text-secondary">
          자기소개, 경력, 학력 및 이력 정보를 관리하고 표시 순서를 조정할 수
          있습니다.
        </p>
      </div>
      <ProfileEditForm defaultProfile={profile} />
    </div>
  );
}
