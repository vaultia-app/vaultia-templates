import * as React from 'react';
import { cn } from '@workspace/ui/lib/utils';

export interface DescriptionListProps extends React.HTMLAttributes<HTMLDListElement> {
  layout?: 'horizontal' | 'stacked' | 'grid';
  columns?: 1 | 2 | 3;
  bordered?: boolean;
}

export function DescriptionList({
  layout = 'horizontal',
  columns = 1,
  bordered = false,
  className,
  ...props
}: DescriptionListProps) {
  return (
    <dl
      data-slot='description-list'
      className={cn(
        'text-sm',
        columns === 1 && 'space-y-2.5',
        columns === 2 && 'grid grid-cols-1 gap-3 sm:grid-cols-2',
        columns === 3 && 'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3',
        bordered && 'divide-y divide-border/60 rounded-lg border border-border p-4',
        className
      )}
      {...props}
    />
  );
}

export interface DescriptionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  layout?: 'horizontal' | 'stacked';
}

export function DescriptionItem({
  layout = 'horizontal',
  className,
  ...props
}: DescriptionItemProps) {
  return (
    <div
      data-slot='description-item'
      className={cn(
        layout === 'horizontal' &&
          'flex items-center justify-between gap-4 py-1.5 first:pt-0 last:pb-0',
        layout === 'stacked' && 'flex flex-col gap-1 py-1.5 first:pt-0 last:pb-0',
        className
      )}
      {...props}
    />
  );
}

export type DescriptionTermProps = React.HTMLAttributes<HTMLElement>;

export function DescriptionTerm({ className, ...props }: DescriptionTermProps) {
  return (
    <dt
      data-slot='description-term'
      className={cn('shrink-0 text-xs font-medium text-muted-foreground', className)}
      {...props}
    />
  );
}

export type DescriptionDetailsProps = React.HTMLAttributes<HTMLElement>;

export function DescriptionDetails({ className, ...props }: DescriptionDetailsProps) {
  return (
    <dd
      data-slot='description-details'
      className={cn(
        'truncate text-right text-xs font-semibold text-foreground sm:text-left',
        className
      )}
      {...props}
    />
  );
}
