'use client';

import { createContext, useContext, useState } from 'react';

interface ImagePreviewState {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
}

interface ImagePreviewContextType {
  state: ImagePreviewState;
  open: (images: string[], index: number) => void;
  close: () => void;
  next: () => void;
  prev: () => void;
}

const ImagePreviewContext = createContext<ImagePreviewContextType | null>(null);

export const useImagePreview = () => {
  const context = useContext(ImagePreviewContext);
  if (!context) {
    throw new Error('ImageGalleryProvider 내부에서만 사용해야 합니다.');
  }
  return context;
};

export default function ImagePreviewProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<ImagePreviewState>({
    images: [],
    currentIndex: 0,
    isOpen: false,
  });

  const open = (images: string[], index: number) => {
    setState({
      images,
      currentIndex: index,
      isOpen: true,
    });
  };

  const close = () => {
    setState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const next = () => {
    setState((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const prevImage = () => {
    setState((prev) => ({
      ...prev,
      currentIndex:
        (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  return (
    <ImagePreviewContext.Provider
      value={{
        state,
        open,
        close,
        next,
        prev: prevImage,
      }}
    >
      {children}
    </ImagePreviewContext.Provider>
  );
}
