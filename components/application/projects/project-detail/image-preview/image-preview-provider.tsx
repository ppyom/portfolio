'use client';

import { useState } from 'react';

import {
  ImagePreviewContext,
  type ImagePreviewContextType,
} from './image-preview-context';

interface ImagePreviewState {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
}

interface Props {
  children: React.ReactNode;
}

export function ImagePreviewProvider({ children }: Props) {
  const [state, setState] = useState<ImagePreviewState>({
    images: [],
    currentIndex: 0,
    isOpen: false,
  });

  const value: ImagePreviewContextType = {
    state,

    open: (images, index) => {
      setState({
        images,
        currentIndex: index,
        isOpen: true,
      });
    },

    close: () => {
      setState((prev) => ({
        ...prev,
        isOpen: false,
      }));
    },

    next: () => {
      setState((prev) => ({
        ...prev,
        currentIndex: (prev.currentIndex + 1) % prev.images.length,
      }));
    },

    prev: () => {
      setState((prev) => ({
        ...prev,
        currentIndex:
          (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
      }));
    },
  };

  return (
    <ImagePreviewContext.Provider value={value}>
      {children}
    </ImagePreviewContext.Provider>
  );
}
