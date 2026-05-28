import { useRef } from 'react';

import { Button } from '@/components/ui/button';

import { useImageUpload } from './image-upload-context';

export function ImageUploadTrigger() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { addFiles, multiple, disabled } = useImageUpload();

  return (
    <>
      <input
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
      <Button disabled={disabled} onClick={() => inputRef.current?.click()}>
        Upload Image
      </Button>
    </>
  );
}
