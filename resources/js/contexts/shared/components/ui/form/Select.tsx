import React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export const Select: React.FC<SelectProps> = ({ className, children, ...props }) => {
  return (
    <select
      {...props}
      className={`appearance-base-select mb-1 block h-[42px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${className ?? ''}`}
    >
      {children}
    </select>
  )
}
