'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { Button, type ButtonProps } from './button';

export interface LoadingButtonProps extends ButtonProps {
  /**
   * Shows a spinner and disables the button while async work is in progress.
   */
  loading?: boolean;
  /**
   * Optional text shown while loading, for example "Saving...".
   */
  loadingText?: React.ReactNode;
}

/**
 * LoadingButton: a button with a built-in spinner that blocks interaction while submitting.
 */
export function LoadingButton({
  loading = false,
  loadingText,
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      data-loading={loading ? '' : undefined}
      className={className}
      {...props}
    >
      {loading && <Loader2 className='size-4 animate-spin' aria-hidden='true' />}
      {loading ? (loadingText ?? children) : children}
    </Button>
  );
}
