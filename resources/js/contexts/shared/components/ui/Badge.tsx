import React from 'react'
import clsx from 'clsx'

export type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'default' | 'custom'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
  customColor?: string
}

const VARIANT_CLASSES: Record<Exclude<BadgeVariant, 'custom'>, string> = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
  default: 'bg-gray-100 text-gray-800',
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  children,
  className = '',
  customColor,
}) => {
  const baseClasses = 'inline-block rounded px-2 py-1 text-xs font-medium'

  if (variant === 'custom' && customColor) {
    return <span className={clsx(baseClasses, customColor, className)}>{children}</span>
  }

  // At this point, variant cannot be 'custom', so we can safely index VARIANT_CLASSES
  const variantKey = variant as Exclude<BadgeVariant, 'custom'>
  return (
    <span className={clsx(baseClasses, VARIANT_CLASSES[variantKey], className)}>{children}</span>
  )
}
