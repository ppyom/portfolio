import { cloneElement, isValidElement } from 'react';

import { useImageUpload } from './image-upload-context';

interface Props {
  children: React.ReactElement<React.ButtonHTMLAttributes<HTMLElement>>;
}

export function ImageUploadTrigger({ children }: Props) {
  const { disabled, openFileDialog } = useImageUpload();

  if (!isValidElement(children)) {
    return null;
  }

  return cloneElement(children, {
    disabled,
    onClick: openFileDialog,
  });
}
