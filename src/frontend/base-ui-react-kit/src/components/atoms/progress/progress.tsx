'use client';

import * as React from 'react';
import { Progress as ProgressPrimitive } from '@base-ui/react/progress';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';

const progressTrackVariants = cva('relative w-full overflow-hidden rounded-full bg-secondary', {
  variants: {
    size: {
      xs: 'h-1',
      sm: 'h-1.5',
      default: 'h-2.5',
      lg: 'h-4'
    }
  },
  defaultVariants: {
    size: 'default'
  }
});

const progressIndicatorVariants = cva(
  'h-full w-full flex-1 transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        success: 'bg-success',
        warning: 'bg-warning',
        destructive: 'bg-destructive',
        info: 'bg-info'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> &
  VariantProps<typeof progressTrackVariants> &
  VariantProps<typeof progressIndicatorVariants> & {
    value?: number;
    max?: number;
    showValue?: boolean;
    label?: string;
  };

function Progress({
  className,
  value = 0,
  max = 100,
  size,
  variant,
  showValue = false,
  label,
  ...props
}: ProgressProps) {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  return (
    <ProgressPrimitive.Root
      value={value}
      max={max}
      data-slot='progress'
      className={cn('w-full space-y-1.5', className)}
      {...props}
    >
      {(label || showValue) && (
        <div className='flex items-center justify-between text-xs text-muted-foreground'>
          {label && <span className='font-medium text-foreground'>{label}</span>}
          {showValue && (
            <span className='font-medium text-foreground'>{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      <div className={cn(progressTrackVariants({ size }))}>
        <div
          data-slot='progress-indicator'
          className={cn(progressIndicatorVariants({ variant }))}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    </ProgressPrimitive.Root>
  );
}

export { Progress, progressTrackVariants, progressIndicatorVariants };
