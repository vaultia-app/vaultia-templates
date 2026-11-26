'use client';

import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number;
  defaultValue?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

function Rating({
  className,
  value,
  defaultValue = 0,
  max = 5,
  onChange,
  readOnly = false,
  disabled = false,
  size = 'default',
  ...props
}: RatingProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const handleClick = (starIndex: number) => {
    if (readOnly || disabled) return;
    if (value === undefined) {
      setInternalValue(starIndex);
    }
    onChange?.(starIndex);
  };

  const sizeClasses = {
    sm: 'size-3.5',
    default: 'size-4.5',
    lg: 'size-6'
  };

  return (
    <div
      data-slot='rating'
      className={cn(
        'inline-flex items-center gap-1',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
      {...props}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starNumber = index + 1;
        const isFilled = starNumber <= displayValue;

        return (
          <button
            key={index}
            type='button'
            disabled={disabled || readOnly}
            onClick={() => handleClick(starNumber)}
            onMouseEnter={() => !readOnly && !disabled && setHoverValue(starNumber)}
            onMouseLeave={() => !readOnly && !disabled && setHoverValue(null)}
            className={cn(
              'rounded-sm p-0.5 transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
              readOnly && 'cursor-default hover:scale-100',
              disabled && 'cursor-not-allowed'
            )}
            aria-label={`${starNumber} sao`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                'transition-colors',
                isFilled
                  ? 'fill-warning text-warning'
                  : 'text-muted-foreground/40 hover:text-warning/60'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

export { Rating };
