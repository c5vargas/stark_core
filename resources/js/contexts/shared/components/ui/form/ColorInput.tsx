import React from 'react'

interface ColorInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string
}

export const ColorInput: React.FC<ColorInputProps> = ({ value, className, ...props }) => {
  return (
    <div className="flex w-full">
      <button
        type="button"
        aria-label="color preview"
        style={{ backgroundColor: value }}
        className="pointer-events-none h-[34px] w-[34px] rounded-s"
      />
      <input
        type="color"
        value={value}
        {...props}
        className={`w-full rounded-e border px-10 py-4 ${className ?? ''}`}
      />
    </div>
  )
}
