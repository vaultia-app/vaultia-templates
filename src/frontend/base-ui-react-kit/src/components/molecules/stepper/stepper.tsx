'use client';

import * as React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@workspace/ui/lib/utils';

export interface StepItemData {
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepItemData[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
}

function Stepper({
  className,
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  ...props
}: StepperProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      data-slot='stepper'
      data-orientation={orientation}
      className={cn(
        'w-full',
        isHorizontal ? 'flex items-center' : 'flex flex-col space-y-4',
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isUpcoming = index > currentStep;
        const isClickable = onStepClick && (isCompleted || isActive);

        const Icon = step.icon;

        return (
          <React.Fragment key={index}>
            <div
              onClick={() => isClickable && onStepClick(index)}
              className={cn(
                'group flex items-center gap-3',
                isHorizontal ? 'flex-1 last:flex-none' : 'w-full',
                isClickable ? 'cursor-pointer' : 'cursor-default'
              )}
            >
              {/* Step Circle Indicator */}
              <div
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold shadow-2xs transition-all',
                  isCompleted && 'bg-primary text-primary-foreground',
                  isActive &&
                    'border-2 border-primary bg-background text-primary ring-4 ring-primary/20',
                  isUpcoming && 'border border-border bg-muted/60 text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className='size-4 stroke-[2.5]' />
                ) : Icon ? (
                  <Icon className='size-4' />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Title & Description */}
              <div className='min-w-0 pr-2'>
                <p
                  className={cn(
                    'truncate text-xs font-semibold transition-colors',
                    isActive
                      ? 'text-primary'
                      : isCompleted
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                  )}
                >
                  {step.title}
                </p>
                {step.description && (
                  <p className='hidden truncate text-[11px] text-muted-foreground sm:block'>
                    {step.description}
                  </p>
                )}
              </div>

              {/* Connecting Line for Horizontal */}
              {isHorizontal && index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-2 h-0.5 flex-1 transition-colors',
                    index < currentStep ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export { Stepper };
