import { useCallback, useEffect, useRef, useState } from 'react';

import ImageUploadContext, { type ImageItem } from './image-upload-context';

interface DefaultFile {
  id: string;
  url: string;
}

interface Props {
  children: React.ReactNode;
  id?: string;
  multiple?: boolean;
  disabled?: boolean;
  defaultFiles?: DefaultFile[];
}

export function ImageUpload({
  children,
  id,
  multiple = false,
  disabled = false,
  defaultFiles = [],
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<ImageItem[]>(
    defaultFiles.map((file) => ({
      ...file,
      type: 'remote',
    })),
  );

  const addFiles = useCallback(
    (list: FileList) => {
      const next: ImageItem[] = Array.from(list).map((file) => ({
        id: crypto.randomUUID(),
        type: 'local',
        file,
        url: URL.createObjectURL(file),
      }));

      setFiles((prev) => (multiple ? [...prev, ...next] : next));
    },
    [multiple],
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => {
      const target = prev.find((file) => file.id === id);

      if (target?.type === 'local') {
        URL.revokeObjectURL(target.url);
      }

      return prev.filter((file) => file.id !== id);
    });
  }, []);

  useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.type === 'local') {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [files]);

  return (
    <ImageUploadContext.Provider
      value={{
        files,
        multiple,
        disabled,
        addFiles,
        removeFile,
        openFileDialog: () => inputRef.current?.click(),
      }}
    >
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        hidden
        disabled={disabled}
        onChange={(event) => {
          if (event.target.files) {
            addFiles(event.target.files);
          }
        }}
      />
      {children}
    </ImageUploadContext.Provider>
  );
}
