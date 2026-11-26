'use client';

import * as React from 'react';
import { UploadCloud, File, FileText, Image as ImageIcon, X, AlertCircle } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';
import { Button } from '../../atoms/button';

export interface FileItemInfo {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

export interface FileUploadProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue' | 'onError'
> {
  value?: File[];
  defaultValue?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // In bytes
  disabled?: boolean;
  helperText?: string;
  onError?: (error: string) => void;
}

function formatBytes(bytes: number, decimals = 1) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function getFileIcon(type: string) {
  if (type.startsWith('image/')) {
    return <ImageIcon className='size-5 text-primary' />;
  }
  if (type.includes('pdf')) {
    return <FileText className='size-5 text-destructive' />;
  }
  return <File className='size-5 text-muted-foreground' />;
}

function FileUpload({
  className,
  value,
  defaultValue = [],
  onChange,
  accept,
  multiple = true,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB default
  disabled = false,
  helperText,
  onError,
  ...props
}: FileUploadProps) {
  const t = useUiLocale().messages.fileUpload;
  const [internalFiles, setInternalFiles] = React.useState<File[]>(defaultValue);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const files = value !== undefined ? value : internalFiles;

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles || incomingFiles.length === 0 || disabled) return;

    const validFiles: File[] = [];
    const currentCount = files.length;

    for (let i = 0; i < incomingFiles.length; i++) {
      const file = incomingFiles[i];

      // Check max files
      if (!multiple && (validFiles.length > 0 || currentCount > 0)) {
        onError?.(t.onlyOne);
        break;
      }
      if (currentCount + validFiles.length >= maxFiles) {
        onError?.(t.tooMany(maxFiles));
        break;
      }

      // Check max size
      if (maxSize && file.size > maxSize) {
        onError?.(t.tooLarge(file.name, formatBytes(maxSize)));
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
      if (value === undefined) {
        setInternalFiles(updatedFiles);
      }
      onChange?.(updatedFiles);
    }
  };

  const removeFile = (indexToRemove: number) => {
    if (disabled) return;
    const updated = files.filter((_, idx) => idx !== indexToRemove);
    if (value === undefined) {
      setInternalFiles(updated);
    }
    onChange?.(updated);
  };

  const onDragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    setIsDragOver(true);
  };

  const onDragLeaveHandler = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div data-slot='file-upload' className={cn('space-y-3', className)} {...props}>
      <input
        ref={inputRef}
        type='file'
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = ''; // Reset input to allow re-uploading same file
        }}
        className='hidden'
      />

      {/* Dropzone Box */}
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={onDragOverHandler}
        onDragLeave={onDragLeaveHandler}
        onDrop={onDropHandler}
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-input p-6 text-center transition-all',
          isDragOver
            ? 'scale-[0.99] border-primary bg-primary/5'
            : 'hover:border-primary/50 hover:bg-muted/40',
          disabled && 'cursor-not-allowed opacity-50 hover:border-input hover:bg-transparent'
        )}
      >
        <div className='mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary'>
          <UploadCloud className='size-6' />
        </div>
        <p className='text-sm font-medium text-foreground'>
          {t.dropzone} <span className='text-primary underline'>{t.browse}</span>
        </p>
        <p className='mt-1 text-xs text-muted-foreground'>
          {helperText ||
            `${accept ? `${t.accepted(accept)} • ` : ''}${t.maxSize(formatBytes(maxSize))}${
              multiple ? ` ${t.maxFiles(maxFiles)}` : ''
            }`}
        </p>
      </div>

      {/* File List Preview */}
      {files.length > 0 && (
        <div data-slot='file-list' className='space-y-2'>
          {files.map((file, idx) => (
            <div
              key={`${file.name}-${idx}`}
              className='flex items-center justify-between rounded-lg border border-border bg-card p-3 shadow-2xs'
            >
              <div className='flex min-w-0 items-center gap-3 pr-2'>
                <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted'>
                  {getFileIcon(file.type)}
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-xs font-semibold text-foreground'>{file.name}</p>
                  <p className='text-[11px] text-muted-foreground'>{formatBytes(file.size)}</p>
                </div>
              </div>

              {!disabled && (
                <Button
                  type='button'
                  variant='ghost'
                  size='icon-xs'
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className='text-muted-foreground hover:text-destructive'
                  aria-label={t.remove(file.name)}
                >
                  <X className='size-4' />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { FileUpload };
