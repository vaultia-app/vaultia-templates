'use client';

import * as React from 'react';
import { format, setHours, setMinutes } from 'date-fns';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';

import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';
import { Button } from '../../atoms/button';
import { Calendar } from '../calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../../organisms/popover';

export interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
  formatStr?: string;
  minuteStep?: number;
  showClear?: boolean;
}

export function DateTimePicker({
  value,
  onChange,
  placeholder,
  disabled = false,
  minDate,
  maxDate,
  className,
  formatStr = 'dd/MM/yyyy HH:mm',
  minuteStep = 15,
  showClear = true
}: DateTimePickerProps) {
  const { dateLocale, messages } = useUiLocale();
  const t = messages.dateTimePicker;
  const [open, setOpen] = React.useState(false);

  // Hour and minute shown while the popover is open
  const currentHour = value ? value.getHours() : 9;
  const currentMinute = value ? Math.floor(value.getMinutes() / minuteStep) * minuteStep : 0;

  const hours = React.useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => i);
  }, []);

  const minutes = React.useMemo(() => {
    const arr: number[] = [];
    for (let i = 0; i < 60; i += minuteStep) {
      arr.push(i);
    }
    return arr;
  }, [minuteStep]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) {
      onChange?.(undefined);
      return;
    }

    // Keep the current hour and minute if one is already set
    let nextDate = setHours(selectedDate, currentHour);
    nextDate = setMinutes(nextDate, currentMinute);
    onChange?.(nextDate);
  };

  const handleTimeChange = (hour: number, minute: number) => {
    const baseDate = value || new Date();
    let nextDate = setHours(baseDate, hour);
    nextDate = setMinutes(nextDate, minute);
    onChange?.(nextDate);
  };

  const handleSetNow = () => {
    const now = new Date();
    onChange?.(now);
  };

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

      <PopoverContent align='start' className='w-auto border border-border p-0 shadow-xl'>
        <div className='flex flex-col sm:flex-row'>
          {/* Calendar */}
          <div className='p-1'>
            <Calendar
              mode='single'
              selected={value}
              onSelect={handleDateSelect}
              disabled={(date) => {
                if (minDate && date < minDate) return true;
                if (maxDate && date > maxDate) return true;
                return false;
              }}
              locale={dateLocale}
            />
          </div>

          {/* Hour and minute columns */}
          <div className='flex w-full flex-col border-t border-border/60 bg-muted/10 p-3 sm:w-48 sm:border-t-0 sm:border-l'>
            <div className='flex items-center gap-1.5 border-b border-border/60 pb-2 text-xs font-bold text-foreground'>
              <Clock className='size-3.5 text-primary' />
              <span>{t.time}</span>
              <span className='ml-auto font-mono font-semibold text-primary'>
                {currentHour.toString().padStart(2, '0')}:
                {currentMinute.toString().padStart(2, '0')}
              </span>
            </div>

            <div className='flex flex-1 gap-2 py-2'>
              {/* Hours */}
              <div className='flex-1 space-y-1'>
                <span className='text-[10px] font-semibold text-muted-foreground uppercase'>
                  {t.hours}
                </span>
                <div className='h-48 space-y-0.5 overflow-y-auto rounded-md border border-border/60 bg-background p-1'>
                  {hours.map((h) => {
                    const isSelected = currentHour === h;
                    return (
                      <button
                        key={h}
                        type='button'
                        onClick={() => handleTimeChange(h, currentMinute)}
                        className={cn(
                          'w-full rounded px-1.5 py-1 text-center font-mono text-xs transition',
                          isSelected
                            ? 'bg-primary font-bold text-primary-foreground shadow-2xs'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {h.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Minutes */}
              <div className='flex-1 space-y-1'>
                <span className='text-[10px] font-semibold text-muted-foreground uppercase'>
                  {t.minutes}
                </span>
                <div className='h-48 space-y-0.5 overflow-y-auto rounded-md border border-border/60 bg-background p-1'>
                  {minutes.map((m) => {
                    const isSelected = currentMinute === m;
                    return (
                      <button
                        key={m}
                        type='button'
                        onClick={() => handleTimeChange(currentHour, m)}
                        className={cn(
                          'w-full rounded px-1.5 py-1 text-center font-mono text-xs transition',
                          isSelected
                            ? 'bg-primary font-bold text-primary-foreground shadow-2xs'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {m.toString().padStart(2, '0')}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick actions */}
            <div className='flex items-center justify-between gap-1 border-t border-border/60 pt-2'>
              <Button
                type='button'
                variant='ghost'
                size='xs'
                onClick={handleSetNow}
                className='text-[11px] text-primary hover:text-primary'
              >
                {t.now}
              </Button>
              <Button
                type='button'
                variant='default'
                size='xs'
                onClick={() => setOpen(false)}
                className='text-[11px]'
              >
                {t.confirm}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
