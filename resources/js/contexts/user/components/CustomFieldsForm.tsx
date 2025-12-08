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
    const value = values[field.name] ?? ''

    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            value={String(value)}
            onChange={e => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            required={field.required}
          />
        )
      case 'select':
        return (
          <Select
            value={String(value)}
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
            value={String(value)}
            onChange={e => handleFieldChange(field.name, Number(e.target.value))}
            placeholder={field.label}
            required={field.required}
          />
        )
      case 'date':
        return (
          <InputText
            type="date"
            value={String(value)}
            onChange={e => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            required={field.required}
          />
        )
      case 'email':
        return (
          <InputText
            type="email"
            value={String(value)}
            onChange={e => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            required={field.required}
          />
        )
      default:
        return (
          <InputText
            type="text"
            value={String(value)}
            onChange={e => handleFieldChange(field.name, e.target.value)}
            placeholder={field.label}
            required={field.required}
          />
        )
    }
  }

  return (
    <>
      {fields.map(field => (
        <FormField key={field.id} label={field.label} required={field.required}>
          {renderField(field)}
        </FormField>
      ))}
    </>
  )
}
