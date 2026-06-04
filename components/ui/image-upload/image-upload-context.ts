import { createContext, useContext } from 'react';

import type { ImageItem } from '@/types/image';

interface ContextValue {
  files: ImageItem[];
  multiple: boolean;
  disabled: boolean;
  addFiles: (files: FileList) => void;
  removeFile: (id: string) => void;
  setFiles: React.Dispatch<React.SetStateAction<ImageItem[]>>;
  openFileDialog: () => void;
}

const ImageUploadContext = createContext<ContextValue | null>(null);

export default ImageUploadContext;

export function useImageUpload() {
  const context = useContext(ImageUploadContext);

  if (!context) {
    throw new Error('ImageUpload components must be used within ImageUpload');
  }

  return context;
}
