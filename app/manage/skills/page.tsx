import type { Metadata } from 'next';
import Link from 'next/link';
import { SlidersHorizontalIcon } from 'lucide-react';

import { getSkills } from '@/database/queries/skill';
import { Button } from '@/components/ui/button';
import PageTitle from '@/components/common/page-title';
import SkillEditForm from '@/components/admin/skills/skill-edit-form';

export const metadata: Metadata = {
  title: '보유 스킬 관리',
};

export default async function Page() {
  const skills = await getSkills.execute();

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
        <PageTitle align="left">보유 스킬 관리</PageTitle>
        <Button variant="outline" size="sm" asChild>
          <Link href="/manage/skills/metadata">
            <SlidersHorizontalIcon />
            스킬 메타데이터 관리
          </Link>
        </Button>
      </div>
      <SkillEditForm defaultSkills={skills} />
    </>
  );
}
