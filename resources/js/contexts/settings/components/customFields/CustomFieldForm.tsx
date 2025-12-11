import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { BaseButton } from '@/contexts/shared/components/Button'
import { CustomField, CustomFieldType } from '@/contexts/user/libs/types'

interface CustomFieldFormProps {
  initialData?: Partial<CustomField>
  onSubmit: (data: Partial<CustomField>) => void | Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export const CustomFieldForm: React.FC<CustomFieldFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<Partial<CustomField>>({
    name: '',
    type: 'text',
    label: '',
    required: false,
    options: null,
    order: 0,
  })

  const fieldTypes: { value: CustomFieldType; label: string }[] = [
    { value: 'text', label: t('dashboard.settings.custom_fields.types.text') },
    { value: 'textarea', label: t('dashboard.settings.custom_fields.types.textarea') },
    { value: 'select', label: t('dashboard.settings.custom_fields.types.select') },
    { value: 'date', label: t('dashboard.settings.custom_fields.types.date') },
    { value: 'number', label: t('dashboard.settings.custom_fields.types.number') },
    { value: 'email', label: t('dashboard.settings.custom_fields.types.email') },
  ]

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        type: initialData.type || 'text',
        label: initialData.label || '',
        required: initialData.required || false,
        options: initialData.options || null,
        order: initialData.order || 0,
      })
    }
  }, [initialData])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : name === 'options'
            ? value
                .split(',')
                .map(opt => opt.trim())
                .filter(opt => opt.length > 0)
            : name === 'order'
              ? parseInt(value) || 0
              : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange(e)
    // Clear options if type is not select
    if (e.target.value !== 'select') {
      setFormData(prev => ({ ...prev, options: null }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField label={t('dashboard.settings.custom_fields.name')} required>
        <InputText
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="phone"
          disabled={!!initialData?.id}
          required
        />
        <p className="mt-1 text-xs text-gray-500">
          {t('dashboard.settings.custom_fields.name_hint')}
        </p>
      </FormField>

      <FormField label={t('dashboard.settings.custom_fields.label')} required>
        <InputText
          name="label"
          value={formData.label}
          onChange={handleChange}
          placeholder={t('dashboard.settings.custom_fields.label_placeholder')}
          required
        />
      </FormField>

      <FormField label={t('dashboard.settings.custom_fields.type')} required>
        <Select name="type" value={formData.type} onChange={handleTypeChange} required>
          {fieldTypes.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </FormField>

      {formData.type === 'select' && (
        <FormField label={t('dashboard.settings.custom_fields.options')} required>
          <InputText
            name="options"
            value={Array.isArray(formData.options) ? formData.options.join(', ') : ''}
            onChange={handleChange}
            placeholder={t('dashboard.settings.custom_fields.options_placeholder')}
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            {t('dashboard.settings.custom_fields.options_hint')}
          </p>
        </FormField>
      )}

      <FormField label={t('dashboard.settings.custom_fields.order')}>
        <InputText
          name="order"
          type="number"
          value={formData.order}
          onChange={handleChange}
          min="0"
        />
      </FormField>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          name="required"
          checked={formData.required || false}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="required" className="text-sm font-medium">
          {t('dashboard.settings.custom_fields.required')}
        </label>
      </div>

      <div className="flex gap-3">
        <BaseButton
          title={
            isLoading
              ? t('shared.loading')
              : initialData?.id
                ? t('buttons.update')
                : t('buttons.create')
          }
          variant="primary"
          type="submit"
          loading={isLoading}
        />
        <BaseButton
          title={t('buttons.cancel')}
          variant="secondary"
          type="button"
          onClick={onCancel}
          disabled={isLoading}
        />
      </div>
    </form>
  )
}
