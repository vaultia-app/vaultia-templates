'use client';

import * as React from 'react';
import { Clock, X } from 'lucide-react';

import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';
import { Button } from '../../atoms/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../organisms/popover';

export interface TimePickerProps {
  value?: string; // "HH:mm", for example "09:30"
  onChange?: (time: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minuteStep?: number; // Minute step: 1, 5, 10, 15, or 30
  className?: string;
  showClear?: boolean;
  /** Quick pick buttons; defaults to the active locale's presets. Pass [] to hide them. */
  presets?: { label: string; value: string }[];
}

export function TimePicker({
  value,
  onChange,
  placeholder,
  disabled = false,
  minuteStep = 15,
  className,
  showClear = true,
  presets
}: TimePickerProps) {
  const t = useUiLocale().messages.timePicker;
  const quickPresets = presets ?? t.presets;
  const [open, setOpen] = React.useState(false);

  // Split HH and mm from value
  const [selectedHour, selectedMinute] = React.useMemo(() => {
    if (!value || !value.includes(':')) return ['09', '00'];
    const parts = value.split(':');
    return [parts[0] || '09', parts[1] || '00'];
  }, [value]);

  const hours = React.useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  }, []);

  const minutes = React.useMemo(() => {
    const arr: string[] = [];
    for (let i = 0; i < 60; i += minuteStep) {
      arr.push(i.toString().padStart(2, '0'));
    }
    return arr;
  }, [minuteStep]);

  const handleSelect = (hour: string, minute: string) => {
    onChange?.(`${hour}:${minute}`);
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
        <Clock className='mr-2 size-3.5 shrink-0 text-muted-foreground' />
        <span className='flex-1 truncate'>{value ? `${value}` : (placeholder ?? t.placeholder)}</span>
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

      <PopoverContent align='start' className='w-[280px] border border-border p-3 shadow-lg'>
        <div className='space-y-3'>
          <div className='flex items-center justify-between border-b border-border/60 pb-2 text-xs'>
            <span className='font-bold text-foreground'>{t.title}</span>
            <span className='font-mono font-semibold text-primary'>{value || '--:--'}</span>
          </div>

          <div className='flex gap-2'>
            {/* Hours */}
            <div className='flex-1 space-y-1'>
              <span className='text-[10px] font-semibold text-muted-foreground uppercase'>{t.hours}</span>
              <div className='h-40 space-y-0.5 overflow-y-auto rounded-md border border-border/60 bg-muted/20 p-1'>
                {hours.map((h) => {
                  const isSelected = selectedHour === h;
                  return (
                    <button
                      key={h}
                      type='button'
                      onClick={() => handleSelect(h, selectedMinute)}
                      className={cn(
                        'w-full rounded px-2 py-1 text-center font-mono text-xs transition',
                        isSelected
                          ? 'bg-primary font-bold text-primary-foreground shadow-2xs'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {h}
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
              <div className='h-40 space-y-0.5 overflow-y-auto rounded-md border border-border/60 bg-muted/20 p-1'>
                {minutes.map((m) => {
                  const isSelected = selectedMinute === m;
                  return (
                    <button
                      key={m}
                      type='button'
                      onClick={() => handleSelect(selectedHour, m)}
                      className={cn(
                        'w-full rounded px-2 py-1 text-center font-mono text-xs transition',
                        isSelected
                          ? 'bg-primary font-bold text-primary-foreground shadow-2xs'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick picks */}
          {quickPresets.length > 0 && (
          <div className='space-y-1.5 border-t border-border/60 pt-2'>
            <span className='text-[10px] font-semibold text-muted-foreground uppercase'>
              {t.quickPicks}
            </span>
            <div className='grid grid-cols-2 gap-1'>
              {quickPresets.map((preset) => (
                <button
                  key={preset.value}
                  type='button'
                  onClick={() => {
                    onChange?.(preset.value);
                    setOpen(false);
                  }}
                  className='rounded border border-border/60 bg-muted/30 px-2 py-1 text-[11px] text-muted-foreground transition hover:border-primary/40 hover:bg-primary/10 hover:text-foreground'
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
