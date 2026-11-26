'use client';

import * as React from 'react';
import { Autocomplete as AutocompletePrimitive } from '@base-ui/react/autocomplete';
import { cn } from '@workspace/ui/lib/utils';
import { Search, X } from 'lucide-react';

const Autocomplete = AutocompletePrimitive.Root;

function AutocompleteInput({
  className,
  showSearchIcon = true,
  ...props
}: AutocompletePrimitive.Input.Props & {
  showSearchIcon?: boolean;
}) {
  if (showSearchIcon) {
    return (
      <div className='relative flex w-full items-center'>
        <Search className='pointer-events-none absolute left-3 size-4 text-muted-foreground' />
        <AutocompletePrimitive.Input
          data-slot='autocomplete-input'
          className={cn(
            'flex h-9 w-full rounded-lg border border-input bg-transparent py-2 pr-3 pl-9 text-sm shadow-2xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:hover:bg-input/50',
            className
          )}
          {...props}
        />
      </div>
    );
  }

  return (
    <AutocompletePrimitive.Input
      data-slot='autocomplete-input'
      className={cn(
        'flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm shadow-2xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30 dark:hover:bg-input/50',
        className
      )}
      {...props}
    />
  );
}

function AutocompleteContent({
  className,
  children,
  side = 'bottom',
  sideOffset = 4,
  align = 'start',
  alignOffset = 0,
  ...props
}: AutocompletePrimitive.Popup.Props &
  Pick<AutocompletePrimitive.Positioner.Props, 'align' | 'alignOffset' | 'side' | 'sideOffset'>) {
  return (
    <AutocompletePrimitive.Portal>
      <AutocompletePrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className='isolate z-50'
      >
        <AutocompletePrimitive.Popup
          data-slot='autocomplete-content'
          className={cn(
            'relative isolate z-50 max-h-(--available-height) w-(--anchor-width) min-w-48 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md duration-100 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2',
            className
          )}
          {...props}
        >
          {children}
        </AutocompletePrimitive.Popup>
      </AutocompletePrimitive.Positioner>
    </AutocompletePrimitive.Portal>
  );
}

function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props) {
  return (
    <AutocompletePrimitive.List
      data-slot='autocomplete-list'
      className={cn(
        'max-h-72 overflow-y-auto overscroll-contain p-1 text-sm outline-hidden data-empty:p-0',
        className
      )}
      {...props}
    />
  );
}

function AutocompleteItem({ className, ...props }: AutocompletePrimitive.Item.Props) {
  return (
    <AutocompletePrimitive.Item
      data-slot='autocomplete-item'
      className={cn(
        'relative flex w-full cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-highlighted:bg-accent data-highlighted:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4',
        className
      )}
      {...props}
    />
  );
}

function AutocompleteEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props) {
  return (
    <AutocompletePrimitive.Empty
      data-slot='autocomplete-empty'
      className={cn('py-6 text-center text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}

function AutocompleteGroup({ className, ...props }: AutocompletePrimitive.Group.Props) {
  return (
    <AutocompletePrimitive.Group
      data-slot='autocomplete-group'
      className={cn('overflow-hidden p-1 text-foreground', className)}
      {...props}
    />
  );
}

function AutocompleteGroupLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props) {
  return (
    <AutocompletePrimitive.GroupLabel
      data-slot='autocomplete-group-label'
      className={cn('px-2 py-1 text-xs font-semibold text-muted-foreground', className)}
      {...props}
    />
  );
}

function AutocompleteSeparator({ className, ...props }: AutocompletePrimitive.Separator.Props) {
  return (
    <AutocompletePrimitive.Separator
      data-slot='autocomplete-separator'
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

function AutocompleteClear({ className, ...props }: AutocompletePrimitive.Clear.Props) {
  return (
    <AutocompletePrimitive.Clear
      data-slot='autocomplete-clear'
      className={cn(
        'rounded p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground',
        className
      )}
      {...props}
    >
      <X className='size-3.5' />
    </AutocompletePrimitive.Clear>
  );
}

export {
  Autocomplete,
  AutocompleteInput,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteSeparator,
  AutocompleteClear
};
