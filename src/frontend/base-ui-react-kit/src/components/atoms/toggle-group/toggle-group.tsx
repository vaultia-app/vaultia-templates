'use client';

import * as React from 'react';
import { ToggleGroup as ToggleGroupPrimitive } from '@base-ui/react/toggle-group';
import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';

const toggleVariants = cva(
  'inline-flex items-center justify-center rounded-md text-xs font-medium transition-all outline-none select-none disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-background data-[pressed]:text-foreground data-[pressed]:shadow-2xs focus-visible:ring-2 focus-visible:ring-ring/50',
  {
    variants: {
      variant: {
        default: 'text-muted-foreground hover:text-foreground',
        outline:
          'border border-input hover:bg-muted hover:text-foreground data-[pressed]:border-primary data-[pressed]:bg-primary/10 data-[pressed]:text-primary'
      },
      size: {
        sm: 'h-7 px-2 gap-1 text-[11px]',
        default: 'h-8 px-2.5 gap-1.5',
        lg: 'h-9 px-3 gap-2 text-sm'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default'
});

export type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive> &
  VariantProps<typeof toggleVariants>;

function ToggleGroup({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: ToggleGroupProps) {
  return (
    <ToggleGroupPrimitive
      data-slot='toggle-group'
      className={cn(
        'inline-flex items-center rounded-lg bg-muted/60 p-1 text-muted-foreground',
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive>
  );
}

export type ToggleGroupItemProps = React.ComponentProps<typeof TogglePrimitive> &
  VariantProps<typeof toggleVariants>;

function ToggleGroupItem({ className, variant, size, ...props }: ToggleGroupItemProps) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <TogglePrimitive
      data-slot='toggle-group-item'
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size
        }),
        className
      )}
      {...props}
    />
  );
}

export { ToggleGroup, ToggleGroupItem, toggleVariants };
