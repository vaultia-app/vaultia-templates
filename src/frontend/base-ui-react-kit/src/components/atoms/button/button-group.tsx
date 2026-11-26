import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@workspace/ui/lib/utils';

const buttonGroupVariants = cva('inline-flex items-center justify-center rounded-lg', {
  variants: {
    orientation: {
      horizontal:
        'flex-row [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:-ml-px [&>*:not(:last-child)]:rounded-r-none',
      vertical:
        'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:-mt-px [&>*:not(:last-child)]:rounded-b-none'
    }
  },
  defaultVariants: {
    orientation: 'horizontal'
  }
});

interface ButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof buttonGroupVariants> {}

function ButtonGroup({ className, orientation = 'horizontal', ...props }: ButtonGroupProps) {
  return (
    <div
      role='group'
      data-slot='button-group'
      data-orientation={orientation}
      className={cn(
        buttonGroupVariants({ orientation }),
        '[&>[data-slot=button]:focus-visible]:z-10 [&>[data-slot=button]:hover]:z-[1]',
        className
      )}
      {...props}
    />
  );
}

export { ButtonGroup, buttonGroupVariants, type ButtonGroupProps };
