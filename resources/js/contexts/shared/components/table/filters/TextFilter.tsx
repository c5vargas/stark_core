import React from 'react'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { useTranslation } from 'react-i18next'

interface TextFilterProps {
  value: string | number | null
  onChange: (value: string | null) => void
  placeholder?: string
  label?: string
}

export const TextFilter: React.FC<TextFilterProps> = ({ value, onChange, placeholder, label }) => {
  const { t } = useTranslation()
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <InputText
        type="text"
        value={value ?? ''}
        onChange={e => onChange(e.target.value || null)}
        placeholder={placeholder ?? t('common.search')}
        className="w-full"
      />
    </div>
  )
}
