'use client';

import * as React from 'react';
import { Coins, X } from 'lucide-react';

import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';
import { Input } from '../../atoms/input';

// ==========================================
// UTILITIES: FORMAT AND PARSE AMOUNTS
// ==========================================

/**
 * Formats a whole amount with the locale's thousands separator.
 * Example: 4500000 -> "4,500,000" (en-US) or "4.500.000" (vi-VN)
 */
export function formatCurrencyValue(val: number | null | undefined, locale = 'en-US'): string {
  if (val === null || val === undefined || isNaN(val)) return '';
  return new Intl.NumberFormat(locale).format(val);
}

/**
 * Parses a formatted string back to a whole number (keeps digits only).
 * Example: "4.500.000" -> 4500000
 */
export function parseCurrencyValue(str: string): number | undefined {
  const clean = str.replace(/[^\d]/g, '');
  if (!clean) return undefined;
  const num = parseInt(clean, 10);
  return isNaN(num) ? undefined : num;
}

// ==========================================
// COMPONENT: CURRENCY INPUT
// ==========================================

export interface CurrencyInputProps extends Omit<
  React.ComponentProps<'input'>,
  'value' | 'defaultValue' | 'onChange'
> {
  value?: number | null;
  defaultValue?: number;
  onValueChange?: (val: number | undefined) => void;
  /** Currency symbol shown as a suffix; defaults to the active locale's currency. */
  currency?: string;
  /** Shows the amount in words when the locale (or `amountInWords`) provides a formatter. */
  showWords?: boolean;
  /** Overrides the locale's amount-in-words formatter. */
  amountInWords?: (amount: number) => string;
  quickAmounts?: number[];
  allowClear?: boolean;
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      className,
      value,
      defaultValue,
      onValueChange,
      currency: currencyProp,
      showWords = false,
      amountInWords: amountInWordsProp,
      quickAmounts,
      allowClear = true,
      disabled,
      placeholder,
      ...props
    },
    ref
  ) => {
    const locale = useUiLocale();
    const t = locale.messages.currencyInput;
    const currency = currencyProp ?? locale.currency;
    const amountInWords = amountInWordsProp ?? locale.amountInWords;
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = React.useState<number | undefined>(
      defaultValue ?? (isControlled ? (value ?? undefined) : undefined)
    );

    const activeValue = isControlled ? (value ?? undefined) : internalValue;
    const displayString = formatCurrencyValue(activeValue, locale.code);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const rawText = e.target.value;
      const parsed = parseCurrencyValue(rawText);

      if (!isControlled) {
        setInternalValue(parsed);
      }
      onValueChange?.(parsed);
    }

    function handleClear() {
      if (!isControlled) {
        setInternalValue(undefined);
      }
      onValueChange?.(undefined);
    }

    function handleQuickSelect(amount: number) {
      if (!isControlled) {
        setInternalValue(amount);
      }
      onValueChange?.(amount);
    }

    const words =
      showWords && amountInWords && activeValue && activeValue > 0 ? amountInWords(activeValue) : '';

    return (
      <div className='w-full space-y-1.5'>
        <div className='relative flex items-center'>
          {/* Input field */}
          <Input
            ref={ref}
            type='text'
            inputMode='numeric'
            disabled={disabled}
            value={displayString}
            onChange={handleInputChange}
            placeholder={placeholder ?? t.placeholder}
            className={cn('pr-14 font-mono text-sm font-medium', className)}
            {...props}
          />

          {/* Right Suffix & Clear button */}
          <div className='absolute right-2.5 flex items-center gap-1.5 text-xs text-muted-foreground select-none'>
            {allowClear && !disabled && activeValue !== undefined && activeValue > 0 && (
              <button
                type='button'
                onClick={handleClear}
                tabIndex={-1}
                className='rounded p-0.5 text-muted-foreground/60 transition hover:bg-muted hover:text-foreground'
                title={t.clear}
              >
                <X className='size-3.5' />
              </button>
            )}
            {currency && (
              <span className='rounded bg-muted px-1.5 py-0.5 font-bold text-foreground/80'>
                {currency}
              </span>
            )}
          </div>
        </div>

        {/* Quick Amount Suggestion Pills */}
        {quickAmounts && quickAmounts.length > 0 && !disabled && (
          <div className='flex flex-wrap items-center gap-1.5 pt-0.5'>
            <span className='text-[11px] text-muted-foreground'>{t.quickPick}</span>
            {quickAmounts.map((amt) => {
              const formatted = formatCurrencyValue(amt, locale.code);
              const isSelected = activeValue === amt;
              return (
                <button
                  key={amt}
                  type='button'
                  onClick={() => handleQuickSelect(amt)}
                  className={cn(
                    'cursor-pointer rounded-md border px-2 py-0.5 text-[11px] font-medium transition',
                    isSelected
                      ? 'border-primary bg-primary font-semibold text-primary-foreground shadow-2xs'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {formatted} {currency}
                </button>
              );
            })}
          </div>
        )}

        {/* Amount in words */}
        {words && (
          <p className='animate-fadeIn flex items-center gap-1.5 text-xs text-muted-foreground italic'>
            <Coins className='size-3 shrink-0 text-warning not-italic' />
            <span>
              {t.inWords} <strong className='font-normal text-foreground not-italic'>{words}</strong>
            </span>
          </p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = 'CurrencyInput';
