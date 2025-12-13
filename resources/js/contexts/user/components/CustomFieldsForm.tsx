import { CustomField } from '@/contexts/user/libs/types'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { Textarea } from '@/contexts/shared/components/ui/form/TextArea'
import { Select } from '@/contexts/shared/components/ui/form/Select'

interface CustomFieldsFormProps {
  fields: CustomField[]
  values: Record<string, unknown>
  onChange: (values: Record<string, unknown>) => void
}

export const CustomFieldsForm = ({ fields, values, onChange }: CustomFieldsFormProps) => {
  const handleFieldChange = (fieldName: string, value: string | number) => {
    onChange({ ...values, [fieldName]: value })
  }

  const renderField = (field: CustomField) => {
    const rawValue = values[field.name]
    const value =
      rawValue === null || rawValue === undefined
        ? ''
        : typeof rawValue === 'object'
          ? ''
          : typeof rawValue === 'string' ||
              typeof rawValue === 'number' ||
              typeof rawValue === 'boolean'
            ? String(rawValue)
            : ''

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={e => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            required={field.required}
          />
        )
      case 'select':
        return (
          <Select
            value={value}
            onChange={e => handleFieldChange(field.name, e.target.value)}
            required={field.required}
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        )
      case 'number':
        return (
          <InputText
            type="number"
            value={value}
            onChange={e => handleFieldChange(field.name, Number(e.target.value))}
            placeholder={field.label}
            required={field.required}
          />
        )
      case 'date':
        return (
          <InputText
            type="date"
            value={value}
            onChange={e => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            required={field.required}
          />
        )
      case 'email':
        return (
          <InputText
            type="email"
            value={value}
            onChange={e => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            required={field.required}
          />
        )
      default:
        return (
          <InputText
            type="text"
            value={value}
            onChange={e => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            required={field.required}
          />
        )
    }
  }

  return (
    <div className="space-y-4">
      {fields.map(field => (
        <FormField key={field.id} label={field.label}>
          {renderField(field)}
        </FormField>
      ))}
    </div>
  )
}
