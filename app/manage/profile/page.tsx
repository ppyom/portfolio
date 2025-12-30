import type { Metadata } from 'next';

import { getProfile } from '@/database/queries/profile';
import PageTitle from '@/components/common/page-title';
import ProfileEditForm from '@/components/admin/profile/profile-edit-form';

export const metadata: Metadata = {
  title: '프로필 관리',
};

export default async function Page() {
  const [profile] = await getProfile.execute({ language: 'ko' });

  return (
    <>
      <PageTitle align="left">프로필 관리</PageTitle>
      <ProfileEditForm defaultProfile={profile} />
    </>
  );
}
