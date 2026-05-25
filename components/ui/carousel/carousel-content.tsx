import { cn } from '@/lib/utils';

interface CarouselContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CarouselContent({ className, children }: CarouselContentProps) {
  return (
    <div className={cn('flex -ml-4 touch-pan-y', className)}>{children}</div>
  );
}
