'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FileX2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty } from '@/components/feedback/empty';

export default function NotFoundPage() {
  const t = useTranslations('ProjectDetail');
  const router = useRouter();

  return (
    <div className="min-h-[500px] flex items-center justify-center">
      <Empty
        icon={FileX2Icon}
        title={t('notFoundTitle')}
        description={t('notFoundDescription')}
      >
        <Button onClick={() => router.back()}>{t('goBack')}</Button>
      </Empty>
    </div>
  );
}
