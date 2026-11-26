'use client';

import * as React from 'react';
import {
  Bell,
  BellOff,
  CheckCheck,
  CircleAlert,
  CircleCheck,
  Info,
  Settings,
  Trash2,
  TriangleAlert,
  type LucideIcon
} from 'lucide-react';

import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';
import { Badge } from '../../atoms/badge';
import { Button } from '../../atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'system';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  /** Display-ready time, for example "5 minutes ago". Format it in the app. */
  time: string;
  read: boolean;
  type: NotificationType;
  /** Overrides the icon for this item's type. */
  icon?: LucideIcon;
  link?: string;
}

const NOTIFICATION_STYLES: Record<NotificationType, { icon: LucideIcon; color: string }> = {
  info: { icon: Info, color: 'text-info bg-info/10 border-info/20' },
  success: { icon: CircleCheck, color: 'text-success bg-success/10 border-success/20' },
  warning: { icon: TriangleAlert, color: 'text-warning bg-warning/10 border-warning/20' },
  error: { icon: CircleAlert, color: 'text-error bg-error/10 border-error/20' },
  system: { icon: Settings, color: 'text-muted-foreground bg-muted border-border' }
};

export interface NotificationsPopoverProps {
  notifications?: NotificationItem[];
  onNotificationsChange?: (items: NotificationItem[]) => void;
  align?: 'start' | 'center' | 'end';
  className?: string;
  /** Hint under the empty state; defaults to the active locale's text. */
  emptyHint?: string;
}

export function NotificationsPopover({
  notifications: controlledItems,
  onNotificationsChange,
  align = 'end',
  className,
  emptyHint
}: NotificationsPopoverProps) {
  const t = useUiLocale().messages.notifications;
  const [internalItems, setInternalItems] = React.useState<NotificationItem[]>([]);
  const items = controlledItems ?? internalItems;
  const [filter, setFilter] = React.useState<'all' | 'unread'>('all');
  const [open, setOpen] = React.useState(false);

  const updateItems = React.useCallback(
    (newItems: NotificationItem[]) => {
      if (!controlledItems) {
        setInternalItems(newItems);
      }
      onNotificationsChange?.(newItems);
    },
    [controlledItems, onNotificationsChange]
  );

  const unreadCount = items.filter((item) => !item.read).length;
  const filteredItems = items.filter((item) => (filter === 'unread' ? !item.read : true));

  function markAllAsRead() {
    const updated = items.map((item) => ({ ...item, read: true }));
    updateItems(updated);
  }

  function toggleItemRead(id: string) {
    const updated = items.map((item) => (item.id === id ? { ...item, read: !item.read } : item));
    updateItems(updated);
  }

  function removeItem(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    const updated = items.filter((item) => item.id !== id);
    updateItems(updated);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant='ghost'
            size='icon'
            className={cn(
              'relative size-9 rounded-lg text-muted-foreground hover:text-foreground',
              className
            )}
            aria-label={t.trigger(unreadCount)}
          />
        }
      >
        <Bell className='size-4' />
        {unreadCount > 0 && (
          <span className='absolute top-1.5 right-1.5 flex size-4 animate-in items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-xs zoom-in-50'>
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent
        align={align}
        side='bottom'
        sideOffset={8}
        className='w-[360px] p-0 sm:w-[400px]'
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-border px-4 py-3'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-bold tracking-tight'>{t.title}</span>
            {unreadCount > 0 ? (
              <Badge variant='default' className='h-5 px-1.5 text-[10px] font-semibold'>
                {t.newCount(unreadCount)}
              </Badge>
            ) : (
              <Badge variant='secondary' className='h-5 px-1.5 text-[10px]'>
                {t.allRead}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant='ghost'
              size='xs'
              onClick={markAllAsRead}
              className='h-7 gap-1 text-[11px] text-muted-foreground hover:text-primary'
            >
              <CheckCheck className='size-3.5' /> {t.markAllRead}
            </Button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className='flex items-center border-b border-border bg-muted/40 px-3 py-1.5'>
          <div className='flex gap-1'>
            <button
              type='button'
              onClick={() => setFilter('all')}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition',
                filter === 'all'
                  ? 'bg-background font-semibold text-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t.all(items.length)}
            </button>
            <button
              type='button'
              onClick={() => setFilter('unread')}
              className={cn(
                'rounded-md px-2.5 py-1 text-xs font-medium transition',
                filter === 'unread'
                  ? 'bg-background font-semibold text-foreground shadow-2xs'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t.unread(unreadCount)}
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className='max-h-[360px] divide-y divide-border/60 overflow-y-auto'>
          {filteredItems.length === 0 ? (
            <div className='flex flex-col items-center justify-center p-8 text-center text-muted-foreground'>
              <div className='flex size-10 items-center justify-center rounded-full bg-muted'>
                <BellOff className='size-5 text-muted-foreground' />
              </div>
              <p className='mt-2 text-xs font-medium text-foreground'>
                {filter === 'unread' ? t.emptyUnread : t.empty}
              </p>
              <p className='mt-1 text-[11px] text-muted-foreground'>
                {emptyHint ?? t.emptyHint}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const style = NOTIFICATION_STYLES[item.type] ?? NOTIFICATION_STYLES.system;
              const Icon = item.icon ?? style.icon;
              const color = style.color;
              return (
                <div
                  key={item.id}
                  onClick={() => toggleItemRead(item.id)}
                  className={cn(
                    'group relative flex cursor-pointer items-start gap-3 p-3 text-left transition hover:bg-muted/60',
                    !item.read && 'bg-primary/5 dark:bg-primary/10'
                  )}
                >
                  {/* Category Icon */}
                  <div
                    className={cn(
                      'flex size-8 shrink-0 items-center justify-center rounded-lg border',
                      color
                    )}
                  >
                    <Icon className='size-4' />
                  </div>

                  {/* Body */}
                  <div className='min-w-0 flex-1 space-y-1'>
                    <div className='flex items-center justify-between gap-2'>
                      <p
                        className={cn(
                          'line-clamp-1 text-xs leading-snug font-medium',
                          !item.read && 'font-bold text-foreground'
                        )}
                      >
                        {item.title}
                      </p>
                      <span className='shrink-0 text-[10px] text-muted-foreground'>
                        {item.time}
                      </span>
                    </div>

                    <p className='line-clamp-2 text-[11px] leading-relaxed text-muted-foreground'>
                      {item.description}
                    </p>
                  </div>

                  {/* Actions / Read status indicator */}
                  <div className='flex shrink-0 items-center gap-1 self-center'>
                    {!item.read && (
                      <span
                        title={t.unreadDot}
                        className='size-2 rounded-full bg-primary ring-2 ring-primary/20'
                      />
                    )}
                    <button
                      type='button'
                      onClick={(e) => removeItem(item.id, e)}
                      aria-label={t.remove}
                      className='p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive'
                    >
                      <Trash2 className='size-3.5' />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className='border-t border-border bg-muted/30 p-2 text-center'>
          <Button
            variant='ghost'
            size='xs'
            onClick={() => setOpen(false)}
            className='w-full text-xs text-muted-foreground hover:text-foreground'
          >
            {t.close}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
