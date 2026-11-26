'use client';

import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';
import { cn } from '@workspace/ui/lib/utils';

export type BottomSheetProps = React.ComponentProps<typeof DrawerPrimitive.Root> & {
  shouldScaleBackground?: boolean;
};

function BottomSheet({ shouldScaleBackground = false, ...props }: BottomSheetProps) {
  return (
    <DrawerPrimitive.Root
      data-slot='bottom-sheet'
      shouldScaleBackground={shouldScaleBackground}
      {...props}
    />
  );
}

function BottomSheetTrigger({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot='bottom-sheet-trigger' {...props} />;
}

function BottomSheetPortal({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot='bottom-sheet-portal' {...props} />;
}

function BottomSheetClose({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot='bottom-sheet-close' {...props} />;
}

function BottomSheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot='bottom-sheet-overlay'
      className={cn(
        'fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity data-state-closed:opacity-0 data-state-open:opacity-100',
        className
      )}
      {...props}
    />
  );
}

export type BottomSheetContentProps = React.ComponentProps<typeof DrawerPrimitive.Content> & {
  showHandle?: boolean;
};

function BottomSheetContent({
  className,
  children,
  showHandle = true,
  ...props
}: BottomSheetContentProps) {
  return (
    <BottomSheetPortal>
      <BottomSheetOverlay />
      <DrawerPrimitive.Content
        data-slot='bottom-sheet-content'
        className={cn(
          // PWA mobile layout: fixed bottom, overscroll-contain, safe-area padding for the notch and home indicator
          'fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto max-h-[92dvh] flex-col overscroll-contain rounded-t-[24px] border-t border-border bg-background pb-[max(1.5rem,env(safe-area-inset-bottom,20px))] shadow-2xl outline-none select-none',
          className
        )}
        {...props}
      >
        {showHandle && (
          <div
            data-slot='bottom-sheet-handle-wrapper'
            className='flex w-full cursor-grab touch-none items-center justify-center pt-3 pb-2 select-none active:cursor-grabbing'
          >
            <div
              data-slot='bottom-sheet-handle'
              className='h-1.5 w-12 rounded-full bg-muted-foreground/30 transition-colors hover:bg-muted-foreground/50'
            />
          </div>
        )}
        <div className='flex flex-1 flex-col overflow-y-auto overscroll-contain px-4 select-text'>
          {children}
        </div>
      </DrawerPrimitive.Content>
    </BottomSheetPortal>
  );
}

function BottomSheetHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot='bottom-sheet-header'
      className={cn('grid gap-1.5 py-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function BottomSheetFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot='bottom-sheet-footer'
      className={cn('mt-auto flex flex-col gap-2 pt-4 pb-2', className)}
      {...props}
    />
  );
}

function BottomSheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot='bottom-sheet-title'
      className={cn(
        'text-base leading-none font-semibold tracking-tight text-foreground',
        className
      )}
      {...props}
    />
  );
}

function BottomSheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot='bottom-sheet-description'
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

/**
 * PWA action sheet list: groups thumb-reachable action buttons
 */
function BottomSheetActionList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot='bottom-sheet-action-list'
      className={cn(
        'my-2 flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border bg-card',
        className
      )}
      {...props}
    />
  );
}

export interface BottomSheetActionItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean;
}

/**
 * PWA action sheet item: a 48px touch target for touch screens
 */
function BottomSheetActionItem({
  className,
  destructive = false,
  children,
  ...props
}: BottomSheetActionItemProps) {
  return (
    <button
      type='button'
      data-slot='bottom-sheet-action-item'
      className={cn(
        'flex min-h-[48px] w-full touch-manipulation items-center gap-3 px-4 py-3 text-left text-sm font-medium transition-colors active:bg-muted/70 disabled:pointer-events-none disabled:opacity-50',
        destructive ? 'text-destructive active:bg-destructive/10' : 'text-foreground',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Aliases cho Drawer convention
const Drawer = BottomSheet;
const DrawerTrigger = BottomSheetTrigger;
const DrawerPortal = BottomSheetPortal;
const DrawerClose = BottomSheetClose;
const DrawerOverlay = BottomSheetOverlay;
const DrawerContent = BottomSheetContent;
const DrawerHeader = BottomSheetHeader;
const DrawerFooter = BottomSheetFooter;
const DrawerTitle = BottomSheetTitle;
const DrawerDescription = BottomSheetDescription;

export {
  BottomSheet,
  BottomSheetPortal,
  BottomSheetOverlay,
  BottomSheetTrigger,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetDescription,
  BottomSheetActionList,
  BottomSheetActionItem,
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription
};
