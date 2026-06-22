import { createContext, useContext } from 'react';

type CarouselContextValue = {
  controller: {
    canNext: boolean;
    canPrev: boolean;
    scrollPrev: () => void;
    scrollNext: () => void;
    scrollTo: (index: number) => void;
  };
  selectedIndex: number;
  scrollSnaps: number[];
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

export function useCarousel() {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error('Carousel must be used within provider');
  return ctx;
}

export default CarouselContext;
