'use client';

import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { ImageFile } from '@/types/project';

import { useImagePreview } from './image-preview';

interface Props {
  images: ImageFile[];
}

export function Images({ images }: Props) {
  const { open } = useImagePreview();

  const imageUrls = images.map((image) => image.url);
  const hasMultipleImages = images.length > 1;

  return (
    <div className="relative">
      <Carousel loop={hasMultipleImages}>
        <CarouselContent>
          {images.map((image, idx) => (
            <CarouselItem key={image.id} className="basis-full sm:basis-1/2">
              <Image
                className="w-full aspect-square object-center object-cover cursor-pointer"
                src={image.url}
                alt={`시연 이미지 ${idx + 1}`}
                width={500}
                height={500}
                onClick={() => open(imageUrls, idx)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {hasMultipleImages && (
          <div className="absolute top-1/2 left-2 right-2 -translate-y-1/2 flex justify-between">
            <CarouselPrevious className="bg-surface-elevated shadow-lg" />
            <CarouselNext className="bg-surface-elevated shadow-lg" />
          </div>
        )}
      </Carousel>
    </div>
  );
}
