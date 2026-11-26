'use client';

import * as React from 'react';
import { OTPField as OTPFieldPrimitive } from '@base-ui/react/otp-field';
import { cn } from '@workspace/ui/lib/utils';
import { Minus } from 'lucide-react';

export type PinInputProps = React.ComponentProps<typeof OTPFieldPrimitive.Root>;

function PinInput({
  className,
  length = 6,
  autoComplete = 'one-time-code',
  ...props
}: PinInputProps) {
  return (
    <OTPFieldPrimitive.Root
      data-slot='pin-input'
      length={length}
      autoComplete={autoComplete}
      className={cn('flex items-center gap-2 has-disabled:opacity-50', className)}
      {...props}
    />
  );
}

function PinInputGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot='pin-input-group'
      className={cn('flex items-center gap-1.5', className)}
      {...props}
    />
  );
}

export type PinInputFieldProps = React.ComponentProps<typeof OTPFieldPrimitive.Input>;

function PinInputField({ className, ...props }: PinInputFieldProps) {
  return (
    <OTPFieldPrimitive.Input
      data-slot='pin-input-field'
      className={cn(
        'relative flex size-11 items-center justify-center rounded-lg border border-input bg-background text-center text-lg font-semibold shadow-2xs transition-all outline-none select-none focus:border-ring focus:ring-3 focus:ring-ring/40 disabled:cursor-not-allowed disabled:opacity-50 data-filled:border-primary data-filled:font-bold',
        className
      )}
      {...props}
    />
  );
}

function PinInputSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot='pin-input-separator'
      role='separator'
      className={cn('text-muted-foreground', className)}
      {...props}
    >
      <Minus className='size-4' />
    </div>
  );
}

// Aliases for InputOTP naming convention
const InputOTP = PinInput;
const InputOTPGroup = PinInputGroup;
const InputOTPSlot = PinInputField;
const InputOTPSeparator = PinInputSeparator;

export {
  PinInput,
  PinInputGroup,
  PinInputField,
  PinInputSeparator,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator
};
