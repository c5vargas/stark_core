import React from 'react'
import { Label } from './Label'

interface FormFieldProps {
  label: string
  helperText?: string
  children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({ label, helperText, children }) => {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {helperText && <small className="text-gray-500">{helperText}</small>}
    </div>
  )
}
