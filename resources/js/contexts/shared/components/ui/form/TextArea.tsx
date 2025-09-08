import React from 'react'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return <textarea {...props} className={`w-full rounded border px-3 py-2 ${className ?? ''}`} />
}
