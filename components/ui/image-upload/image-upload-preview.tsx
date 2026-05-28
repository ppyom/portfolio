import { XIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { useImageUpload } from './image-upload-context';

export function ImageUploadPreview() {
  const { files, removeFile, disabled } = useImageUpload();

  if (!files.length) {
    return null;
  }

  return (
    <div className={cn('grid grid-cols-3 gap-4', disabled && 'opacity-50')}>
      {files.map((file) => (
        <div
          key={file.id}
          className="relative overflow-hidden rounded-lg border bg-surface-muted"
        >
          <img
            src={file.url}
            alt=""
            className="aspect-video w-full object-cover"
          />
          <button
            type="button"
            aria-label="Remove image"
            disabled={disabled}
            onClick={() => removeFile(file.id)}
            className="absolute right-2 top-2 rounded-full bg-surface-elevated p-1 shadow transition-opacity hover:opacity-80 disabled:pointer-events-none"
          >
            <XIcon size={14} />
          </button>
          <span
            className={cn(
              'absolute left-2 top-2 rounded-lg px-2 py-1 text-xs font-medium',
              file.type === 'remote'
                ? 'bg-semantic-info text-text-semantic-info'
                : 'bg-semantic-success text-text-semantic-success',
            )}
          >
            {file.type === 'remote' ? 'Uploaded' : 'New'}
          </span>
        </div>
      ))}
    </div>
  );
}
