import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@workspace/ui/lib/utils';

const badgeVariants = cva(
  'group/badge inline-flex h-5.5 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        // 1. Subtle variants: tinted background, colored border, high-contrast text
        default: 'border-primary/40 bg-primary text-primary-foreground shadow-2xs [a]:hover:bg-primary/90',
        secondary: 'border-border bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        success:
          'border-success/30 bg-success-accent text-success-accent-foreground [a]:hover:bg-success-accent/80',
        warning:
          'border-warning/30 bg-warning-accent text-warning-accent-foreground [a]:hover:bg-warning-accent/80',
        info: 'border-info/30 bg-info-accent text-info-accent-foreground [a]:hover:bg-info-accent/80',
        destructive:
          'border-error/30 bg-error-accent text-error-accent-foreground [a]:hover:bg-error-accent/80',
        outline:
          'border-border bg-background text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost:
          'border-transparent hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'border-transparent text-primary underline-offset-4 hover:underline',

        // 2. Solid variants: filled, saturated background, maximum contrast
        'solid-primary':
          'border-primary bg-primary font-bold text-primary-foreground shadow-2xs [a]:hover:bg-primary/90',
        'solid-success':
          'border-success bg-success text-success-foreground shadow-2xs [a]:hover:bg-success/90',
        'solid-warning':
          'border-warning bg-warning font-bold text-warning-foreground shadow-2xs [a]:hover:bg-warning/90',
        'solid-info': 'border-info bg-info text-info-foreground shadow-2xs [a]:hover:bg-info/90',
        'solid-destructive':
          'border-error bg-error text-error-foreground shadow-2xs [a]:hover:bg-error/90'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

function Badge({
  className,
  variant = 'default',
  render,
  ...props
}: useRender.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: 'span',
    props: mergeProps<'span'>(
      {
        className: cn(badgeVariants({ variant }), className)
      },
      props
    ),
    render,
    state: {
      slot: 'badge',
      variant
    }
  });
}

export { Badge, badgeVariants };
