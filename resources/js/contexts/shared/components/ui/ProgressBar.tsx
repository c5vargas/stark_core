import React from 'react'
import clsx from 'clsx'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showValues?: boolean
  used?: string
  total?: string
  className?: string
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValues = false,
  used,
  total,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const getColorClass = () => {
    if (percentage > 90) return 'bg-red-500'
    if (percentage > 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className={className}>
      {label && (
        <div className="mb-1 flex justify-between text-xs">
          {showValues && used && total ? (
            <>
              <span>
                {label} {percentage.toFixed(2)}%
              </span>
              <span>
                {used} / {total}
              </span>
            </>
          ) : (
            <span>
              {label} {percentage.toFixed(2)}%
            </span>
          )}
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className={clsx('h-2 rounded-full transition-all', getColorClass())}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
