import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`shadow-blur relative flex min-w-0 flex-auto flex-col overflow-hidden rounded-2xl border-0 bg-white/80 bg-clip-border p-4 break-words backdrop-blur-2xl backdrop-saturate-200 ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
