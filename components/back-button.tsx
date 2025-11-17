'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function BackButton({ children, className }: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length === 1) {
      router.replace('/#Projects');
    } else {
      router.back();
    }
  };

  return (
    <Button
      className={cn('cursor-pointer', className)}
      variant="ghost"
      onClick={handleBack}
    >
      {children}
    </Button>
  );
}
