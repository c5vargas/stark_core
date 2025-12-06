import React from 'react'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'

interface DateRangeFilterProps {
  value: { start: string | null; end: string | null } | null
  onChange: (value: { start: string | null; end: string | null } | null) => void
  label?: string
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ value, onChange, label }) => {
  const startValue = value?.start ?? ''
  const endValue = value?.end ?? ''

  const handleStartChange = (start: string | null) => {
    onChange({ start, end: value?.end ?? null })
  }

  const handleEndChange = (end: string | null) => {
    onChange({ start: value?.start ?? null, end })
  }

  const handleClear = () => {
    onChange(null)
  }

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="mb-1 block text-xs text-gray-600">Desde</label>
          <InputText
            type="date"
            value={startValue}
            onChange={e => handleStartChange(e.target.value || null)}
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs text-gray-600">Hasta</label>
          <InputText
            type="date"
            value={endValue}
            onChange={e => handleEndChange(e.target.value || null)}
            className="w-full"
          />
        </div>
      </div>
      {(startValue || endValue) && (
        <button
          type="button"
          onClick={handleClear}
          className="text-xs text-blue-600 hover:text-blue-700"
        >
          Limpiar
        </button>
      )}
    </div>
  )
}
