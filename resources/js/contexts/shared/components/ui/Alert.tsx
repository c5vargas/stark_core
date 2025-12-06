import React from 'react'

type AlertVariant = 'error' | 'warning' | 'info' | 'success'

interface AlertProps {
  message?: string
  variant?: AlertVariant
  className?: string
  children?: React.ReactNode
}

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  error: 'bg-red-100 text-red-700 border border-red-300',
  warning: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  info: 'bg-blue-100 text-blue-700 border border-blue-300',
  success: 'bg-green-100 text-green-700 border border-green-300',
}

export const Alert: React.FC<AlertProps> = ({
  message,
  variant = 'error',
  className = '',
  children,
}) => {
  return (
    <div role="alert" className={`rounded-md p-4 text-sm ${VARIANT_CLASSES[variant]} ${className}`}>
      {children || message}
    </div>
  )
}
