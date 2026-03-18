'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { useImagePreview } from './provider';

export default function ImagePreviewModal() {
  const { state, close, next, prev } = useImagePreview();

  // ESC / 키보드 처리
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!state.isOpen) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
      }
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, close, next, prev]);

  useEffect(() => {
    if (!state.isOpen) return;

    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [state.isOpen]);

  if (!state.isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center"
      onClick={close}
    >
      <div
        className="relative max-w-[500px] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Carousel
          opts={{
            startIndex: state.currentIndex,
            loop: true,
          }}
        >
          <CarouselContent>
            {state.images.map((imageUrl, idx) => (
              <CarouselItem key={imageUrl}>
                <Image
                  src={imageUrl}
                  alt={`시연 이미지 Preview ${idx}`}
                  width={1200}
                  height={800}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
        <button
          className={cn(
            'sm:fixed',
            'absolute top-4 right-4 p-2 rounded-full',
            'bg-black/20 text-white',
          )}
          onClick={close}
        >
          <XIcon />
        </button>
      </div>
    </div>,
    document.body,
  );
}
