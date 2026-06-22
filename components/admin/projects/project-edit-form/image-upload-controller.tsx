'use client';

import { useEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { useImageUpload } from '@/components/ui/image-upload';
import type { ImageItem } from '@/types/image';

interface Props {
  name: string;
}

export function ImageUploadController({ name }: Props) {
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
  });
  const { files, setFiles } = useImageUpload();

  useEffect(() => {
    if (Array.isArray(field.value)) {
      setFiles(field.value as ImageItem[]);
    }
  }, []);

  useEffect(() => {
    field.onChange(files);
  }, [files]);

  return null;
}
