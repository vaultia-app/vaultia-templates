'use client';

import * as React from 'react';
import { format } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { Calendar as CalendarIcon, X } from 'lucide-react';

import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';
import { Button } from '../../atoms/button';
import { Calendar } from '../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../organisms/popover';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  formatStr?: string;
  showClear?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  disabled = false,
  minDate,
  maxDate,
  className,
  formatStr = 'dd/MM/yyyy',
  showClear = true
}: DatePickerProps) {
  const { dateLocale, messages } = useUiLocale();
  const t = messages.datePicker;
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
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
          {value ? format(value, formatStr, { locale: dateLocale }) : (placeholder ?? t.placeholder)}
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

      <PopoverContent align='start' className='w-auto border border-border p-0 shadow-md'>
        <Calendar
          mode='single'
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
          disabled={(date) => {
            if (minDate && date < minDate) return true;
            if (maxDate && date > maxDate) return true;
            return false;
          }}
          locale={dateLocale}
        />
      </PopoverContent>
    </Popover>
  );
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  formatStr?: string;
  showClear?: boolean;
}

export function DateRangePicker({
  value,
  onChange,
  placeholder,
  disabled = false,
  minDate,
  maxDate,
  className,
  formatStr = 'dd/MM/yyyy',
  showClear = true
}: DateRangePickerProps) {
  const { dateLocale, messages } = useUiLocale();
  const t = messages.datePicker;
  const [open, setOpen] = React.useState(false);

  const displayLabel = React.useMemo(() => {
    if (!value?.from) return placeholder ?? t.rangePlaceholder;
    const from = format(value.from, formatStr, { locale: dateLocale });
    if (value.to) {
      return `${from} - ${format(value.to, formatStr, { locale: dateLocale })}`;
    }
    return t.rangeFrom(from);
  }, [value, formatStr, placeholder, dateLocale, t]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            type='button'
            variant='outline'
            disabled={disabled}
            className={cn(
              'h-9 w-full justify-start px-3 text-left text-xs font-normal',
              !value?.from && 'text-muted-foreground',
              className
            )}
          />
        }
      >
        <CalendarIcon className='mr-2 size-3.5 shrink-0 text-muted-foreground' />
        <span className='flex-1 truncate'>{displayLabel}</span>
        {showClear && value?.from && !disabled && (
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
            title={t.rangeClear}
          >
            <X className='size-3' />
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent align='start' className='w-auto border border-border p-0 shadow-md'>
        <Calendar
          mode='range'
          selected={value}
          onSelect={(range) => {
            onChange?.(range);
          }}
          disabled={(date) => {
            if (minDate && date < minDate) return true;
            if (maxDate && date > maxDate) return true;
            return false;
          }}
          locale={dateLocale}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
