'use client';

import * as React from 'react';
import { NumberField as NumberFieldPrimitive } from '@base-ui/react/number-field';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';

export type NumberInputProps = React.ComponentProps<typeof NumberFieldPrimitive.Root> & {
  size?: 'sm' | 'default' | 'lg';
};

function NumberInput({
  className,
  defaultValue = 0,
  min,
  max,
  step = 1,
  size = 'default',
  disabled = false,
  ...props
}: NumberInputProps) {
  const t = useUiLocale().messages.numberInput;
  return (
    <NumberFieldPrimitive.Root
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      data-slot='number-input'
      className={cn('inline-flex items-center', className)}
      {...props}
    >
      <NumberFieldPrimitive.Group
        className={cn(
          'inline-flex items-center overflow-hidden rounded-lg border border-input bg-background shadow-2xs transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/40 disabled:opacity-50',
          size === 'sm' && 'h-8 text-xs',
          size === 'default' && 'h-9 text-sm',
          size === 'lg' && 'h-10 text-base'
        )}
      >
        <NumberFieldPrimitive.Decrement
          data-slot='number-input-decrement'
          className={cn(
            'flex items-center justify-center border-r border-input bg-muted/30 text-muted-foreground transition-colors select-none hover:bg-muted hover:text-foreground active:bg-muted/70 disabled:pointer-events-none disabled:opacity-40',
            size === 'sm' && 'size-8',
            size === 'default' && 'size-9',
            size === 'lg' && 'size-10'
          )}
          aria-label={t.decrease}
        >
          <Minus className='size-3.5' />
        </NumberFieldPrimitive.Decrement>

        <NumberFieldPrimitive.Input
          className={cn(
            'w-14 [appearance:textfield] bg-transparent text-center font-medium outline-none select-text [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
            size === 'sm' && 'w-12 text-xs',
            size === 'default' && 'w-14 text-sm',
            size === 'lg' && 'w-16 text-base'
          )}
        />

        <NumberFieldPrimitive.Increment
          data-slot='number-input-increment'
          className={cn(
            'flex items-center justify-center border-l border-input bg-muted/30 text-muted-foreground transition-colors select-none hover:bg-muted hover:text-foreground active:bg-muted/70 disabled:pointer-events-none disabled:opacity-40',
            size === 'sm' && 'size-8',
            size === 'default' && 'size-9',
            size === 'lg' && 'size-10'
          )}
          aria-label={t.increase}
        >
          <Plus className='size-3.5' />
        </NumberFieldPrimitive.Increment>
      </NumberFieldPrimitive.Group>
    </NumberFieldPrimitive.Root>
  );
}

export { NumberInput };
