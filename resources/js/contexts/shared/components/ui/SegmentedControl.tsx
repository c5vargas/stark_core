import React from 'react'
import clsx from 'clsx'

export type SegmentedControlVariant = 'neutral' | 'brand' | 'toolbar'

export interface SegmentedOption {
  value: string
  label: React.ReactNode
  ariaLabel?: string
}

export interface SegmentedControlProps {
  value: string
  onChange: (value: string) => void
  options: SegmentedOption[]
  variant?: SegmentedControlVariant
  className?: string
  id?: string
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  value,
  onChange,
  options,
  variant = 'neutral',
  className,
  id,
}) => {
  const trackClass =
    variant === 'toolbar'
      ? 'flex h-[38px] gap-1 rounded-lg border border-gray-200 bg-white p-1'
      : variant === 'brand'
        ? 'mb-4 flex w-fit gap-3 rounded-lg bg-gray-100 p-1'
        : 'flex gap-2'

  return (
    <div id={id} className={clsx(trackClass, className)} role="tablist">
      {options.map(opt => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          aria-label={opt.ariaLabel}
          onClick={() => onChange(opt.value)}
          className={clsx(
            'transition-colors',
            variant === 'brand' && 'min-w-[260px] flex-1 rounded-md px-4 py-2 text-sm font-medium',
            variant === 'brand' &&
              value === opt.value &&
              'shadow-soft-md bg-gradient-to-tl from-purple-700 to-pink-500 text-white',
            variant === 'brand' &&
              value !== opt.value &&
              'text-gray-600 hover:bg-gray-200 hover:text-gray-900',
            variant === 'neutral' && 'rounded-lg px-3 py-1.5 text-sm font-medium',
            variant === 'neutral' &&
              value === opt.value &&
              'shadow-soft-md bg-gradient-to-tl from-purple-700 to-pink-500 text-white',
            variant === 'neutral' &&
              value !== opt.value &&
              'bg-gray-100 text-gray-700 hover:bg-gray-200',
            variant === 'toolbar' && 'rounded px-3 py-1.5 text-sm font-medium',
            variant === 'toolbar' && value === opt.value && 'bg-gray-200',
            variant === 'toolbar' && value !== opt.value && 'text-gray-600 hover:bg-gray-100'
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
