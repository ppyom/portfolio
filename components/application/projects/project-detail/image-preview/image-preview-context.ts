'use client';

import { createContext, useContext } from 'react';

interface ImagePreviewState {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
}

export interface ImagePreviewContextType {
  state: ImagePreviewState;
  open: (images: string[], index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

export const ImagePreviewContext =
  createContext<ImagePreviewContextType | null>(null);

export function useImagePreview() {
  const context = useContext(ImagePreviewContext);

  if (!context) {
    throw new Error('ImagePreviewProvider 내부에서만 사용해야 합니다.');
  }

  return context;
}
