import { useState, useEffect } from 'react'
import { useSettings } from '@/contexts/settings/hooks/useSettings'
import { useOutletContext } from 'react-router-dom'
import { SettingsMap } from '@/contexts/settings/libs/types'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { useTranslation } from 'react-i18next'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { BaseButton } from '@/contexts/shared/components/Button'

export const GoogleAnalyticsForm: React.FC = () => {
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { t } = useTranslation()
  const { update } = useSettings()

  const [form, setForm] = useState<Partial<SettingsMap>>({
    analytics_property_id: '',
    manager_measurement_id: '',
  })

  useEffect(() => {
    setForm({
      analytics_property_id: settings.analytics_property_id || '',
      manager_measurement_id: settings.manager_measurement_id || '',
    })
  }, [settings])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    update(form)
  }

  return (
    <InfoCard>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label={t('dashboard.settings.google.manager_measurement')}
          helperText={t('dashboard.settings.google.manager_measurement_desc')}
        >
          <InputText
            type="text"
            name="manager_measurement_id"
            placeholder="G-******"
            value={form.manager_measurement_id}
            onChange={handleChange}
          />
        </FormField>

        <BaseButton title={t('dashboard.settings.update')} variant="primary" type="submit" />
      </form>
    </InfoCard>
  )
}
