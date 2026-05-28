import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export function CarouselItem({ className, children }: Props) {
  return (
    <div className={cn('min-w-0 shrink-0 grow-0 basis-full pl-4', className)}>
      {children}
    </div>
  );
}
