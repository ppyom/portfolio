'use client';

import { CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

interface Props {
  email: string;
}

export default function CopyEmailButton({ email }: Props) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    toast.success('이메일주소가 복사되었습니다.');
  };

  return (
    <Button
      className="text-muted-foreground cursor-pointer"
      variant="secondary"
      onClick={handleCopy}
    >
      <CopyIcon />
      이메일 주소 복사
    </Button>
  );
}
