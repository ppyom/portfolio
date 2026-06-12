import { AlertTriangleIcon } from 'lucide-react';

interface Props {
  title?: string;
  message?: string | null;
}

export function SystemError({ message, title = '시스템 오류' }: Props) {
  if (!message) return null;

  return (
    <div className="border-semantic-error/20 bg-semantic-error/5 rounded-md border p-4">
      <div className="flex items-start gap-3">
        <AlertTriangleIcon className="text-semantic-error mt-0.5 size-4 shrink-0" />
        <div className="space-y-1">
          <p className="text-semantic-error text-sm font-semibold">{title}</p>
          <p className="text-text-muted text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
