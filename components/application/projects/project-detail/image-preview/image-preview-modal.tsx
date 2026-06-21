'use client';

import Image from 'next/image';
import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Modal, ModalClose, ModalContent } from '@/components/ui/modal';

import { useImagePreview } from './image-preview-context';

export function ImagePreviewModal() {
  const { state, close } = useImagePreview();
  const hasMultipleImages = state.images.length > 1;

  if (!state.isOpen) return null;

  return (
    <Modal open={state.isOpen} onOpenChange={close}>
      <ModalContent className="relative bg-transparent max-w-none border-0 shadow-none">
        <Carousel className="h-full" loop={hasMultipleImages}>
          <CarouselContent className="h-full">
            {state.images.map((image, idx) => (
              <CarouselItem
                key={`${idx}_${image}`}
                className="h-full flex items-center justify-center"
              >
                <Image
                  className="h-full w-auto object-contain"
                  src={image}
                  alt={`preview-${idx + 1}`}
                  width={1200}
                  height={800}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {hasMultipleImages && (
            <div className="fixed top-1/2 left-4 right-4 -translate-y-1/2 flex justify-between">
              <CarouselPrevious className="bg-surface-elevated shadow-lg" />
              <CarouselNext className="bg-surface-elevated shadow-lg" />
            </div>
          )}
        </Carousel>
        <ModalClose>
          <Button className="fixed top-4 right-4 bg-surface-elevated text-primary">
            <XIcon size={14} />
          </Button>
        </ModalClose>
      </ModalContent>
    </Modal>
  );
}
