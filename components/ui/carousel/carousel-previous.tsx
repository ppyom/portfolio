import { ChevronLeftIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useCarousel } from './carousel-context';

interface Props {
  className?: string;
}

export function CarouselPrevious({ className }: Props) {
  const { controller } = useCarousel();

  return (
    <button
      type="button"
      onClick={controller.scrollPrev}
      disabled={!controller.canPrev}
      aria-label="Previous slide"
      className={cn(
        'cursor-pointer inline-flex items-center justify-center rounded-md p-2 transition',
        'disabled:opacity-50 disabled:pointer-events-none',
        className,
      )}
    >
      <ChevronLeftIcon size={16} />
    </button>
  );
}
