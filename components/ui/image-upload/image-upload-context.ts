import { createContext, useContext } from 'react';

export type ImageItem =
  | {
      id: string;
      type: 'remote';
      url: string;
    }
  | {
      id: string;
      type: 'local';
      file: File;
      url: string;
    };

interface ContextValue {
  files: ImageItem[];
  multiple: boolean;
  disabled: boolean;
  addFiles: (files: FileList) => void;
  removeFile: (id: string) => void;
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
