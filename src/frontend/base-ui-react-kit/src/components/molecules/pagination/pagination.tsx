'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';
import { Button, buttonVariants } from '../../atoms/button';

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role='navigation'
      aria-label='pagination'
      data-slot='pagination'
      className={cn('mx-auto flex w-full items-center justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot='pagination-content'
      className={cn('m-0 flex list-none flex-row items-center gap-1 p-0', className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot='pagination-item'
      className={cn('inline-flex list-none items-center justify-center', className)}
      {...props}
    />
  );
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>;

function PaginationLink({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot='pagination-link'
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? 'default' : 'ghost',
          size
        }),
        size === 'icon' ? 'size-8' : 'h-8 px-2.5',
        'flex cursor-pointer items-center justify-center rounded-lg text-xs font-semibold transition-colors select-none',
        isActive && 'bg-primary font-bold text-primary-foreground shadow-2xs',
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  const t = useUiLocale().messages.pagination;
  return (
    <PaginationLink
      aria-label={t.previousPage}
      size='default'
      className={cn('gap-1 text-xs', className)}
      {...props}
    >
      <ChevronLeft className='size-3.5' />
      <span className='hidden sm:inline'>{t.previous}</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
  const t = useUiLocale().messages.pagination;
  return (
    <PaginationLink
      aria-label={t.nextPage}
      size='default'
      className={cn('gap-1 text-xs', className)}
      {...props}
    >
      <span className='hidden sm:inline'>{t.next}</span>
      <ChevronRight className='size-3.5' />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<'span'>) {
  const t = useUiLocale().messages.pagination;
  return (
    <span
      aria-hidden
      data-slot='pagination-ellipsis'
      className={cn('flex size-8 items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      <MoreHorizontal className='size-4' />
      <span className='sr-only'>{t.morePages}</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
};
