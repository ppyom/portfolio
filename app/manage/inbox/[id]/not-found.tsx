'use client';

import { useRouter } from 'next/navigation';
import { MessageCircleXIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import NotFound from '@/components/common/not-found';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <NotFound
        title="메시지를 찾을 수 없습니다."
        description="이미 처리되었거나 삭제된 메시지입니다."
        icon={MessageCircleXIcon}
      >
        <Button variant="secondary" onClick={() => router.back()}>
          이전 페이지로 이동하기
        </Button>
      </NotFound>
    </div>
  );
}
