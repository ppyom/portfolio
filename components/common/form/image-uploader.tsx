'use client';

import { useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import Image from 'next/image';
import { PlusIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ImageFile } from '@/types/project';

interface Props {
  name: string;
  multiple?: boolean;
  existName: string;
}

export default function ImageUploader({ name, multiple, existName }: Props) {
  const { control } = useFormContext();
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
  });
  const {
    field: { value: existValue, onChange: onExistChange },
  } = useController({ name: existName, control });

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];

    if (multiple) {
      onChange(files);
      setPreviewUrls(files.map((file) => URL.createObjectURL(file)));
    } else {
      const file = files[0] ?? null;
      onChange(file);
      setPreviewUrls(() => (file ? [URL.createObjectURL(file)] : []));
      if (existValue?.[0]) {
        onExistChange([{ ...existValue[0], deleted: true }]);
      }
    }
  };

  const handleRemoveExistedImage = (id: string) => {
    const remain = Array.from<ImageFile & { deleted: boolean }>(existValue).map(
      (img) => (img.id === id ? { ...img, deleted: true } : img),
    );
    onExistChange(remain);
  };
  const handleRemovePreview = (idx: number) => {
    if (!value) return;

    if (multiple && Array.isArray(value)) {
      const arr = [...value];
      arr.splice(idx, 1);
      onChange(name, arr);
      setPreviewUrls((prev) => {
        const arr = [...prev];
        arr.splice(idx, 1);
        return arr;
      });
    } else {
      onChange(name, null);
      setPreviewUrls([]);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <input
        id={name}
        hidden
        type="file"
        multiple={multiple}
        onChange={handleChange}
      />
      <Button type="button" variant="secondary" asChild>
        <label htmlFor={name}>
          <PlusIcon />
          이미지 추가
        </label>
      </Button>

      {existValue.length > 0 && (
        <div className="flex gap-4 mt-2 flex-wrap">
          {existValue
            .filter((image: { deleted: boolean }) => !image.deleted)
            .map((image: ImageFile) => (
              <div
                key={`${existName}_${image.url}`}
                className="relative group mt-2"
              >
                <Image
                  src={image.url}
                  width={100}
                  height={100}
                  className="w-24 h-24 object-cover rounded border"
                  alt="preview"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon-sm"
                  className={cn(
                    'size-6 rounded-full cursor-pointer',
                    'absolute top-0 right-0 -translate-y-1/2 translate-x-1/2',
                  )}
                  onClick={() => handleRemoveExistedImage(image.id)}
                >
                  <XIcon />
                </Button>
              </div>
            ))}
        </div>
      )}

      {previewUrls.length > 0 && (
        <div className="flex gap-4 mt-2 flex-wrap">
          {previewUrls.map((src, idx) => (
            <div key={src} className="relative group mt-2">
              <Image
                src={src}
                width={100}
                height={100}
                className="w-24 h-24 object-cover rounded border"
                alt="preview"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                className={cn(
                  'size-6 rounded-full cursor-pointer',
                  'absolute top-0 right-0 -translate-y-1/2 translate-x-1/2',
                )}
                onClick={() => handleRemovePreview(idx)}
              >
                <XIcon />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
