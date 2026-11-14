import { useTranslations } from 'next-intl';
import { FileX2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Empty } from '@/components/feedback/empty';
import { Link } from '@/i18n/navigation';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');

  return (
    <div className="h-screen flex items-center justify-center">
      <Empty
        icon={FileX2Icon}
        title={t('title')}
        description={t('description')}
      >
        <Link href="/" replace>
          <Button>{t('goHome')}</Button>
        </Link>
      </Empty>
    </div>
  );
}
