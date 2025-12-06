import React from 'react'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { FilterOption } from '@/contexts/shared/libs/dataTable/types'

interface SelectFilterProps {
  value: string | number | null
  onChange: (value: string | number | null) => void
  options: FilterOption[]
  label?: string
  placeholder?: string
}

export const SelectFilter: React.FC<SelectFilterProps> = ({
  value,
  onChange,
  options,
  label,
  placeholder = 'Seleccionar...',
}) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <Select
        value={value ?? ''}
        onChange={e => {
          const selectedValue = e.target.value
          onChange(selectedValue === '' ? null : selectedValue)
        }}
        className="w-full"
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}
