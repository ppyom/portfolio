import { useCallback, useEffect, useMemo, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

import CarouselContext from './carousel-context';

interface Props {
  children: React.ReactNode;
  loop?: boolean;
  align?: 'start' | 'center' | 'end';
}

export function Carousel({ children, loop = false, align = 'center' }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop,
    align,
    containScroll: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };

    update();

    emblaApi.on('select', update);
    emblaApi.on('reInit', update);

    return () => {
      emblaApi.off('select', update);
      emblaApi.off('reInit', update);
    };
  }, [emblaApi]);

  return (
    <CarouselContext.Provider
      value={useMemo(
        () => ({
          controller: {
            scrollPrev,
            scrollNext,
            scrollTo,
            canPrev,
            canNext,
          },
          selectedIndex,
          scrollSnaps,
        }),
        [
          scrollPrev,
          scrollNext,
          scrollTo,
          canPrev,
          canNext,
          selectedIndex,
          scrollSnaps,
        ],
      )}
    >
      <div
        ref={emblaRef}
        className="overflow-hidden"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            scrollPrev();
          }
          if (e.key === 'ArrowRight') {
            scrollNext();
          }
        }}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}
