import { ReactNode } from 'react'
import { Card } from '@/contexts/shared/components/ui/Card'
import clsx from 'clsx'

export interface StatCardProps {
  title: string
  value: string | number
  icon?: ReactNode
  change?: string
  changeType?: 'increase' | 'decrease'
  changeLabel?: string
  className?: string
  loading?: boolean
}

export const StatCard = ({
  title,
  value,
  icon,
  change,
  changeType,
  changeLabel,
  className,
  loading = false,
}: StatCardProps) => {
  if (loading) {
    return (
      <Card className={clsx('animate-pulse', className)}>
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-4 w-24 rounded bg-gray-200"></div>
            <div className="h-8 w-32 rounded bg-gray-200"></div>
            {change && <div className="h-3 w-16 rounded bg-gray-200"></div>}
          </div>
          {icon && <div className="h-12 w-12 rounded-lg bg-gray-200"></div>}
        </div>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-0 !text-sm font-medium text-gray-600">{title}</p>
          <p className="mb-0 !text-3xl font-semibold text-gray-900">{value}</p>
          {change && changeType && (
            <p
              className={clsx(
                'mt-1 mb-0 flex items-center text-sm',
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              )}
            >
              <span>{change}</span>
              {changeLabel && <span className="ml-1 text-gray-500">{changeLabel}</span>}
            </p>
          )}
        </div>
        {icon && (
          <div className="rounded-lg bg-pink-50 p-3">
            <div className="text-pink-700">{icon}</div>
          </div>
        )}
      </div>
    </Card>
  )
}
