'use client';

import * as React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X } from 'lucide-react';

import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';
import { Button } from '../../atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../organisms/popover';

export interface MonthPickerProps {
  /** Any day in the selected month; onChange always returns the 1st of the month. */
  value?: Date;
  onChange?: (month: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Earliest selectable month (compares month and year only). */
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  showClear?: boolean;
  id?: string;
}

const monthIndex = (date: Date) => date.getFullYear() * 12 + date.getMonth();
/** Picks a month and year (for example a billing period); styled like DatePicker. */
export function MonthPicker({
  value,
  onChange,
  placeholder,
  disabled = false,
  minDate,
  maxDate,
  className,
  showClear = false,
  id
}: MonthPickerProps) {
  const t = useUiLocale().messages.monthPicker;
  const [open, setOpen] = React.useState(false);
  const [year, setYear] = React.useState(() => (value ?? minDate ?? new Date()).getFullYear());

  const isDisabled = (month: number) => {
    const index = year * 12 + month;
    return (
      (minDate !== undefined && index < monthIndex(minDate)) ||
      (maxDate !== undefined && index > monthIndex(maxDate))
    );
  };

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setYear((value ?? minDate ?? new Date()).getFullYear());
      }}
    >
      <PopoverTrigger
        render={
          <Button
            id={id}
            type='button'
            variant='outline'
            disabled={disabled}
            className={cn(
              'h-9 w-full justify-start px-3 text-left text-xs font-normal',
              !value && 'text-muted-foreground',
              className
            )}
          />
        }
      >
        <CalendarIcon className='mr-2 size-3.5 shrink-0 text-muted-foreground' />
        <span className='flex-1 truncate'>
          {value ? t.selected(value.getMonth() + 1, value.getFullYear()) : (placeholder ?? t.placeholder)}
        </span>
        {showClear && value && !disabled && (
          <span
            role='button'
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onChange?.(undefined);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.stopPropagation();
                onChange?.(undefined);
              }
            }}
            className='ml-1 cursor-pointer rounded-sm p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground'
            title={t.clear}
          >
            <X className='size-3' />
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align='start' className='w-64 border border-border p-3 shadow-md'>
        <div className='mb-2 flex items-center justify-between'>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='size-7'
            aria-label={t.previousYear}
            disabled={minDate !== undefined && year <= minDate.getFullYear()}
            onClick={() => setYear((y) => y - 1)}
          >
            <ChevronLeft className='size-4' />
          </Button>
          <span className='text-sm font-semibold tabular-nums'>{year}</span>
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='size-7'
            aria-label={t.nextYear}
            disabled={maxDate !== undefined && year >= maxDate.getFullYear()}
            onClick={() => setYear((y) => y + 1)}
          >
            <ChevronRight className='size-4' />
          </Button>
        </div>
        <div className='grid grid-cols-3 gap-1' role='grid' aria-label={t.monthsOfYear(year)}>
          {Array.from({ length: 12 }, (_, month) => {
            const selected =
              value !== undefined && value.getFullYear() === year && value.getMonth() === month;
            return (
              <Button
                key={month}
                type='button'
                size='sm'
                variant={selected ? 'default' : 'ghost'}
                className='h-9 text-xs'
                disabled={isDisabled(month)}
                aria-pressed={selected}
                onClick={() => {
                  onChange?.(new Date(year, month, 1));
                  setOpen(false);
                }}
              >
                {t.month(month + 1)}
              </Button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
