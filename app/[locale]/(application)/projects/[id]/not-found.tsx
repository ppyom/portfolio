'use client';

import { useRouter } from 'next/navigation';
import { FileX2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty } from '@/components/feedback/empty';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <Empty
        icon={FileX2Icon}
        title="프로젝트를 찾을 수 없습니다."
        description="존재하지 않거나 삭제된 프로젝트입니다."
      >
        <Button onClick={() => router.back()}>이전 페이지로 이동하기</Button>
      </Empty>
    </div>
  );
}
