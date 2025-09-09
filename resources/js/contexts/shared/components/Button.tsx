import React from 'react'
import { LoadingIcon } from './HugeIcons'

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  icon?: React.ReactNode
  loading?: boolean
  variant: 'primary' | 'secondary'
}

const VARIANT_CLASSES: Record<BaseButtonProps['variant'], string> = {
  primary: 'bg-gradient-to-tl from-purple-700 to-pink-500 text-white shadow-soft-md',
  secondary:
    'bg-transparent border border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white',
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  icon,
  loading = false,
  type = 'button',
  onClick,
  className = '',
  variant = 'primary',
  ...rest
}) => {
  const variantClasses = VARIANT_CLASSES[variant] ?? ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || rest.disabled}
      aria-busy={loading}
      className={`leading-pro tracking-tight-soft ease-soft-in inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-2 text-xs font-medium transition-all hover:opacity-85 active:opacity-85 disabled:opacity-25 ${variantClasses} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="flex items-center">
          <LoadingIcon />
          <span className="ml-2">{title}</span>
        </span>
      ) : (
        <>
          {icon && icon}
          <span>{title}</span>
        </>
      )}
    </button>
  )
}
