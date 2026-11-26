import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';

const kbdVariants = cva(
  'inline-flex items-center justify-center rounded-md border border-border bg-muted font-mono font-medium text-muted-foreground shadow-2xs select-none',
  {
    variants: {
      size: {
        xs: 'h-4 min-w-4 px-1 text-[10px]',
        sm: 'h-5 min-w-5 px-1.5 text-[11px]',
        default: 'h-6 min-w-6 px-2 text-xs'
      }
    },
    defaultVariants: {
      size: 'default'
    }
  }
);

export type KbdProps = React.HTMLAttributes<HTMLElement> & VariantProps<typeof kbdVariants>;

function Kbd({ className, size, ...props }: KbdProps) {
  return <kbd data-slot='kbd' className={cn(kbdVariants({ size }), className)} {...props} />;
}

export { Kbd, kbdVariants };
