'use client';

import * as React from 'react';
import { Slider as SliderPrimitive } from '@base-ui/react/slider';
import { cn } from '@workspace/ui/lib/utils';

export type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root> & {
  showValueLabel?: boolean;
  valueFormatter?: (value: number) => string;
};

function Slider({
  className,
  defaultValue = [0],
  value,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValueLabel = false,
  valueFormatter = (val) => `${val}`,
  ...props
}: SliderProps) {
  // Normalize values to an array of numbers for thumbs and label
  const rawValues = value ?? defaultValue;
  const normalizedValues: number[] = Array.isArray(rawValues)
    ? (rawValues as number[])
    : typeof rawValues === 'number'
      ? [rawValues]
      : [min];

  return (
    <SliderPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      data-slot='slider'
      className={cn(
        'relative flex w-full touch-none flex-col gap-2 py-1 select-none disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      {showValueLabel && (
        <div className='flex justify-between text-xs text-muted-foreground'>
          <span>{valueFormatter(min)}</span>
          <span className='font-medium text-foreground'>
            {normalizedValues.map((v) => valueFormatter(v)).join(' - ')}
          </span>
          <span>{valueFormatter(max)}</span>
        </div>
      )}
      <SliderPrimitive.Control className='relative flex w-full items-center py-2'>
        <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-secondary'>
          <SliderPrimitive.Indicator className='absolute h-full bg-primary' />
        </SliderPrimitive.Track>
        {normalizedValues.map((_, index) => (
          <SliderPrimitive.Thumb
            key={index}
            index={index}
            data-slot='slider-thumb'
            className='block size-5 cursor-grab rounded-full border-2 border-primary bg-background shadow-md transition-all hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/40 focus-visible:outline-none active:cursor-grabbing disabled:pointer-events-none'
          />
        ))}
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

export { Slider };
