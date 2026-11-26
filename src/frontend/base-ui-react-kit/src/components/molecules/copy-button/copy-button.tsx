'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { Button, type ButtonProps } from '../../atoms/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../atoms/tooltip';
import { cn } from '@workspace/ui/lib/utils';
import { useUiLocale } from '@workspace/ui/lib/locale';

export interface CopyButtonProps extends Omit<ButtonProps, 'onClick' | 'value'> {
  value: string;
  timeout?: number;
  onCopy?: () => void;
  tooltipText?: string;
  copiedTooltipText?: string;
  showText?: boolean;
}

export function CopyButton({
  value,
  timeout = 2000,
  onCopy,
  tooltipText: tooltipTextProp,
  copiedTooltipText: copiedTooltipTextProp,
  showText = false,
  className,
  variant = 'ghost',
  size = 'icon-xs',
  ...props
}: CopyButtonProps) {
  const t = useUiLocale().messages.copyButton;
  const tooltipText = tooltipTextProp ?? t.copy;
  const copiedTooltipText = copiedTooltipTextProp ?? t.copied;
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy?.();
        setTimeout(() => setCopied(false), timeout);
      } catch (err) {
        console.error('Failed to copy to clipboard', err);
      }
    },
    [value, timeout, onCopy]
  );

  const buttonElement = (
    <Button
      type='button'
      variant={variant}
      size={size}
      aria-label={copied ? copiedTooltipText : tooltipText}
      className={cn(
        'relative transition-all',
        copied && 'text-success hover:text-success',
        className
      )}
      onClick={handleCopy}
      {...props}
    >
      {copied ? (
        <Check className='size-3.5 animate-in duration-200 zoom-in-50' />
      ) : (
        <Copy className='size-3.5' />
      )}
      {showText && (
        <span className='text-xs font-medium'>{copied ? copiedTooltipText : tooltipText}</span>
      )}
    </Button>
  );

  if (showText) {
    return buttonElement;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={buttonElement} />
      <TooltipContent side='top' className='text-xs'>
        {copied ? copiedTooltipText : tooltipText}
      </TooltipContent>
    </Tooltip>
  );
}
