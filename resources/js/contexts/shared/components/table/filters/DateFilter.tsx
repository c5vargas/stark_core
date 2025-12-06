import React from 'react'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'

interface DateFilterProps {
  value: string | number | null
  onChange: (value: string | null) => void
  placeholder?: string
  label?: string
}

export const DateFilter: React.FC<DateFilterProps> = ({
  value,
  onChange,
  placeholder = 'Seleccionar fecha...',
  label,
}) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <InputText
        type="date"
        value={value ?? ''}
        onChange={e => onChange(e.target.value || null)}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  )
}
