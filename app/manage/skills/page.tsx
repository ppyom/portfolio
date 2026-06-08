import type { Metadata } from 'next';
import Link from 'next/link';
import { SlidersHorizontalIcon } from 'lucide-react';

import { getSkills } from '@/services/skills';
import { Button } from '@/components/ui/button';
import { SkillEditForm } from '@/components/admin/skills/skill-edit-form';

export const metadata: Metadata = {
  title: '보유 스킬 관리',
};

export default async function Page() {
  const skills = await getSkills();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-8 md:px-8 space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <p className="text-2xl font-bold">보유 스킬 관리</p>
          <p className="text-text-secondary">
            보유한 기술 스택을 카테고리별로 작성합니다.
          </p>
        </div>
        <Button variant="secondary" size="sm">
          <Link
            href="/manage/skills/metadata"
            className="flex gap-2 items-center"
          >
            <SlidersHorizontalIcon size={14} />
            스킬 메타데이터 관리
          </Link>
        </Button>
      </div>
      <SkillEditForm defaultSkills={skills} />
    </div>
  );
}
