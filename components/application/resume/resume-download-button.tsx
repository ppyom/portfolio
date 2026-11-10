import { DownloadIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Props extends React.ComponentProps<typeof Button> {
  url?: string | null;
}

export function ResumeDownloadButton({
  url,
  className,
  children = '이력서 다운로드',
  ...props
}: Props) {
  if (!url) {
    return null;
  }

  return (
    <a href={url} download>
      <Button className={cn('gap-2', className)} {...props}>
        <DownloadIcon size={16} aria-hidden="true" />
        {children}
      </Button>
    </a>
  );
}
