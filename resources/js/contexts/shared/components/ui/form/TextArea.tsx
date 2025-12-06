import React from 'react'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  const normalizedValue = props.value === null || props.value === undefined ? '' : props.value

  return (
    <textarea
      {...props}
      value={normalizedValue}
      className={`w-full rounded border px-3 py-2 ${className ?? ''}`}
    />
  )
}
