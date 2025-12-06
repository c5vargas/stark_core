import React from 'react'
import { BaseButton } from '../Button'

interface EmptyStateProps {
  title: string
  description?: string
  icon?: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-center ${className}`}>
      {icon && <div className="mb-4 text-4xl text-gray-400">{icon}</div>}
      <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="mb-4 max-w-sm text-sm text-gray-500">{description}</p>}
      {action && <BaseButton variant="primary" title={action.label} onClick={action.onClick} />}
    </div>
  )
}
