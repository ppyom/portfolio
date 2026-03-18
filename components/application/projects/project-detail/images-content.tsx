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

import { useImagePreview } from './image-preview/provider';

interface Props {
  images: ImageFile[];
}

export default function ImagesContent({ images }: Props) {
  const { open } = useImagePreview();

  const imageUrls = images.map((image) => image.url);

  return (
    <Carousel
      opts={{
        align: 'center',
        loop: true,
      }}
    >
      <CarouselContent>
        {images.map((image, idx) => (
          <CarouselItem key={image.id} className="basis-full sm:basis-1/2">
            <Image
              className="w-full aspect-square object-center object-cover"
              src={image.url}
              alt={`시연 이미지 ${idx}`}
              width={500}
              height={500}
              onClick={() => open(imageUrls, idx)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
