'use client';

import { useEffect, useState } from 'react';

import { updateStatusAction } from '@/app/manage/inbox/actions';
import { commonErrorMessages } from '@/lib/constants/error-messages';
import { SystemError } from '@/components/feedback/system-error';
import type { InboxMessage } from '@/types/inbox-message';

interface Props {
  id: string;
  status: InboxMessage['status'];
}

export function MarkAsRead({ id, status }: Props) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'unread') return;

    const markAsRead = async () => {
      const result = await updateStatusAction(id, 'read');

      if (!result.success) {
        setError(result.message || commonErrorMessages.unknown.default);
      }
    };

    void markAsRead();
  }, [id, status]);

  if (!error) return null;

  return <SystemError title="읽음 처리 실패" message={error} />;
}
