import Link from 'next/link';

import { Button } from '@/components/ui/button';
import NotFound from '@/components/common/not-found';

export default function NotFoundPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <NotFound
        title="요청하신 페이지를 찾을 수 없습니다."
        description="주소가 잘못되었거나 페이지가 이동/삭제되었을 수 있습니다."
      >
        <Button variant="secondary" asChild>
          <Link href="/" replace>
            메인 페이지로 이동하기
          </Link>
        </Button>
      </NotFound>
    </div>
  );
}
