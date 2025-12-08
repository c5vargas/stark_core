import { ReactNode } from 'react'
import clsx from 'clsx'

interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  className?: string
}

const variantClasses = {
  default: 'bg-white border-gray-200',
  primary: 'bg-blue-50 border-blue-200',
  success: 'bg-green-50 border-green-200',
  warning: 'bg-yellow-50 border-yellow-200',
  error: 'bg-red-50 border-red-200',
}

const iconClasses = {
  default: 'text-gray-600',
  primary: 'text-blue-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  error: 'text-red-600',
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  variant = 'default',
  className,
}: StatCardProps) => {
  return (
    <div
      className={clsx(
        'rounded-lg border p-3 transition-shadow hover:shadow-md',
        variantClasses[variant],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <p className="m-0 text-sm font-medium text-gray-600">{title}</p>
        {icon && (
          <div
            className={clsx(
              'flex h-12 w-12 items-center justify-center rounded-lg',
              iconClasses[variant]
            )}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="mb-0 !text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className="mt-2 flex items-center gap-1">
            <span
              className={clsx('text-xs font-medium', {
                'text-green-600': trend.isPositive !== false,
                'text-red-600': trend.isPositive === false,
              })}
            >
              {trend.isPositive !== false ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-gray-600">{trend.label}</span>
          </div>
        )}
      </div>
    </div>
  )
}
