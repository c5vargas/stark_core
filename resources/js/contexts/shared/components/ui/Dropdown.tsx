import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  close: () => void
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

export const useDropdownContext = (): DropdownContextValue => {
  const ctx = useContext(DropdownContext)
  if (!ctx) {
    throw new Error('useDropdownContext must be used within a Dropdown')
  }
  return ctx
}

export const Dropdown: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  const toggle = useCallback(() => setOpen(o => !o), [])

  const value = useMemo(
    () => ({
      open,
      setOpen,
      toggle,
      close,
    }),
    [open, close, toggle]
  )

  useEffect(() => {
    if (!open) return

    const handleMouseDown = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <DropdownContext.Provider value={value}>
      <div ref={containerRef} className={clsx('relative', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

export const DropdownMenu: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  const { open } = useDropdownContext()
  if (!open) return null

  return (
    <div
      className={clsx(
        'ring-opacity-5 absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black focus:outline-none',
        className
      )}
      role="menu"
      aria-orientation="vertical"
    >
      <div className="py-1">{children}</div>
    </div>
  )
}

export const DropdownMenuHeader: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={clsx('border-b border-slate-200 px-4 py-3', className)}>{children}</div>
)

export const DropdownMenuSection: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => <div className={clsx('py-1', className)}>{children}</div>

export const DropdownMenuFooter: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => (
  <div className={clsx('border-t border-slate-200 py-1', className)}>{children}</div>
)

const itemBase =
  'flex w-full items-center px-4 py-2 text-sm text-left transition-colors rounded-none font-normal'

const itemVariants: Record<'default' | 'danger', string> = {
  default: 'text-slate-700 hover:bg-slate-100',
  danger: 'text-red-600 hover:bg-red-50',
}

export const DropdownMenuItem: React.FC<{
  children: React.ReactNode
  to?: string
  icon?: React.ReactNode
  className?: string
  variant?: 'default' | 'danger'
  onClick?: () => void
}> = ({ children, to, icon, className, variant = 'default', onClick }) => {
  const { close } = useDropdownContext()

  const handleActivate = () => {
    onClick?.()
    close()
  }

  const content = (
    <>
      {icon ? <span className="mr-3 shrink-0 [&>svg]:h-4 [&>svg]:w-4">{icon}</span> : null}
      {children}
    </>
  )

  if (to !== undefined) {
    return (
      <Link
        to={to}
        role="menuitem"
        className={clsx(itemBase, itemVariants[variant], className)}
        onClick={handleActivate}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      role="menuitem"
      className={clsx(itemBase, itemVariants[variant], className)}
      onClick={handleActivate}
    >
      {content}
    </button>
  )
}
