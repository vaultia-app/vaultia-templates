'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@workspace/ui/lib/utils';

export type TimelineProps = React.HTMLAttributes<HTMLOListElement>;

function Timeline({ className, ...props }: TimelineProps) {
  return (
    <ol
      data-slot='timeline'
      className={cn('relative ml-3 space-y-6 border-l-2 border-border', className)}
      {...props}
    />
  );
}

export type TimelineItemProps = React.LiHTMLAttributes<HTMLLIElement>;

function TimelineItem({ className, ...props }: TimelineItemProps) {
  return (
    <li
      data-slot='timeline-item'
      className={cn('group relative pl-6 last:mb-0', className)}
      {...props}
    />
  );
}

const timelinePointVariants = cva(
  'absolute -left-[9px] top-1.5 flex size-4 items-center justify-center rounded-full border-2 border-background ring-4 ring-background shadow-xs',
  {
    variants: {
      variant: {
        default: 'bg-muted-foreground',
        primary: 'bg-primary',
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

export interface TimelinePointProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof timelinePointVariants> {
  icon?: React.ReactNode;
}

function TimelinePoint({ className, variant, icon, ...props }: TimelinePointProps) {
  return (
    <div
      data-slot='timeline-point'
      className={cn(
        timelinePointVariants({ variant }),
        icon && 'top-0.5 -left-[13px] size-6 text-background',
        className
      )}
      {...props}
    >
      {icon}
    </div>
  );
}

export interface TimelineHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: React.ReactNode;
  time?: React.ReactNode;
}

function TimelineHeader({ className, title, time, ...props }: TimelineHeaderProps) {
  return (
    <div
      data-slot='timeline-header'
      className={cn(
        'flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
      {...props}
    >
      <div className='text-xs font-semibold text-foreground'>{title}</div>
      {time && <time className='text-[11px] whitespace-nowrap text-muted-foreground'>{time}</time>}
    </div>
  );
}

export type TimelineBodyProps = React.HTMLAttributes<HTMLDivElement>;

function TimelineBody({ className, ...props }: TimelineBodyProps) {
  return (
    <div
      data-slot='timeline-body'
      className={cn('mt-1 text-xs leading-relaxed text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Timeline,
  TimelineItem,
  TimelinePoint,
  TimelineHeader,
  TimelineBody,
  timelinePointVariants
};
