import React from 'react'
import { LoadingIcon } from './HugeIcons'
import clsx from 'clsx'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'ghost'
  | 'outline'
  | 'link'

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | 'icon'

export type ButtonShape = 'default' | 'rounded' | 'pill' | 'square'

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  loading?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  shape?: ButtonShape
  fullWidth?: boolean
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-tl from-purple-700 to-pink-500 text-white shadow-soft-md hover:shadow-soft-lg',
  secondary:
    'bg-transparent border border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white',
  success:
    'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-md hover:shadow-lg',
  danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-md hover:shadow-lg',
  warning:
    'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 shadow-md hover:shadow-lg',
  info: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-md hover:shadow-lg',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 border border-transparent',
  outline:
    'bg-transparent border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white',
  link: 'bg-transparent text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline p-0',
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-4 py-1 text-xs',
  md: 'px-6 py-2 text-sm',
  lg: 'px-8 py-3 text-base',
  xl: 'px-10 py-4 text-lg',
  icon: 'h-9 w-9 shrink-0 justify-center p-0 gap-0 [&>svg]:h-5 [&>svg]:w-5',
}

const SHAPE_CLASSES: Record<ButtonShape, string> = {
  default: 'rounded-lg',
  rounded: 'rounded-md',
  pill: 'rounded-full',
  square: 'rounded-none',
}

export const BaseButton: React.FC<BaseButtonProps> = ({
  title = '',
  icon,
  iconPosition = 'left',
  loading = false,
  type = 'button',
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  shape = 'default',
  fullWidth = false,
  ...rest
}) => {
  const variantClasses = VARIANT_CLASSES[variant] ?? ''
  const sizeClasses = SIZE_CLASSES[size] ?? ''
  const shapeClasses = SHAPE_CLASSES[shape] ?? ''
  const widthClass = fullWidth ? 'w-full justify-center' : ''
  const isIconSize = size === 'icon'

  const baseClasses = clsx(
    'leading-pro tracking-tight-soft ease-soft-in inline-flex cursor-pointer items-center font-medium transition-all disabled:opacity-25 disabled:cursor-not-allowed',
    isIconSize ? 'gap-0' : 'gap-2',
    'focus-visible:ring-violet-500/60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
  )

  const variantsWithCustomHover = ['success', 'danger', 'warning', 'info', 'outline']
  const isLinkVariant = variant === 'link'
  const hasCustomHover = variantsWithCustomHover.includes(variant)
  const hoverClasses =
    isLinkVariant || hasCustomHover ? '' : 'hover:opacity-85 active:opacity-85 active:scale-[0.98]'

  const spinnerClass =
    size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : size === 'icon' ? 'h-4 w-4' : 'h-4 w-4'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || rest.disabled}
      aria-busy={loading}
      className={clsx(
        baseClasses,
        variantClasses,
        sizeClasses,
        shapeClasses,
        widthClass,
        hoverClasses,
        loading && 'cursor-not-allowed opacity-50',
        className
      )}
      {...rest}
    >
      {loading ? (
        <span className={clsx('flex items-center', isIconSize && 'justify-center')}>
          <LoadingIcon className={spinnerClass} />
          {!isIconSize && title ? (
            <span className={iconPosition === 'right' ? 'mr-2' : 'ml-2'}>{title}</span>
          ) : null}
        </span>
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          {title ? <span>{title}</span> : null}
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </button>
  )
}

// Simple Button component for flexible use
export const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    variant?: ButtonVariant
    size?: ButtonSize
    shape?: ButtonShape
    fullWidth?: boolean
  }
> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  shape = 'default',
  fullWidth = false,
  ...props
}) => {
  const variantClasses = VARIANT_CLASSES[variant] ?? ''
  const sizeClasses = SIZE_CLASSES[size] ?? ''
  const shapeClasses = SHAPE_CLASSES[shape] ?? ''
  const widthClass = fullWidth ? 'w-full justify-center' : ''
  const isIconSize = size === 'icon'

  const baseClasses = clsx(
    'inline-flex items-center justify-center font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed',
    isIconSize ? 'gap-0' : 'gap-2',
    'focus-visible:ring-violet-500/60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
  )

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses,
        sizeClasses,
        shapeClasses,
        widthClass,
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
