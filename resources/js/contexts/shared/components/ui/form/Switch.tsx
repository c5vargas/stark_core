import React from 'react'
import clsx from 'clsx'

interface SwitchProps {
  checked: boolean
  onChange: (value: boolean) => void
  id?: string
  label?: string
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, id, label }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={clsx(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          checked ? '!bg-violet-600' : '!bg-gray-200'
        )}
      >
        <span
          className={clsx(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            checked ? '!translate-x-3' : '!translate-x-0.5'
          )}
        />
      </button>
      {label && (
        <label htmlFor={id} className="cursor-pointer text-sm text-gray-600">
          {label}
        </label>
      )}
    </div>
  )
}
