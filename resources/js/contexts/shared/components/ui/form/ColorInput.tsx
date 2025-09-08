import React from 'react'

interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export const ColorInput: React.FC<ColorInputProps> = ({ value, className, ...props }) => {
  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-label="color preview"
        style={{ backgroundColor: value }}
        className="pointer-events-none absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2 transform rounded-full"
      />
      <input
        type="color"
        value={value}
        {...props}
        className={`w-full rounded border px-10 py-4 ${className ?? ''}`}
      />
    </div>
  )
}
