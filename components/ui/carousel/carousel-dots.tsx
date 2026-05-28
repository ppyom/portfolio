import { cn } from '@/lib/utils';

import { useCarousel } from './carousel-context';

interface Props {
  className?: string;
}

export function CarouselDots({ className }: Props) {
  const { selectedIndex, scrollSnaps, controller } = useCarousel();

  if (!scrollSnaps.length) {
    return null;
  }

  return (
    <div
      className={cn('flex items-center justify-center gap-2', className)}
      role="tablist"
      aria-label="Carousel navigation"
    >
      {scrollSnaps.map((_, index) => {
        const active = selectedIndex === index;
        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={active}
            aria-current={active ? 'true' : undefined}
            onClick={() => controller.scrollTo(index)}
            className={cn(
              'h-2 w-2 rounded-full transition-all',
              active && 'scale-125 bg-text-primary',
              !active && 'cursor-pointer bg-surface-secondary hover:bg-border',
            )}
          />
        );
      })}
    </div>
  );
}
