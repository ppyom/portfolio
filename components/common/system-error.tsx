import { AlertTriangleIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Props {
  title?: string;
  message?: string | null;
}

export default function SystemError({ message, title = '시스템 오류' }: Props) {
  if (!message) return null;

  return (
    <Alert variant="destructive">
      <AlertTriangleIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
