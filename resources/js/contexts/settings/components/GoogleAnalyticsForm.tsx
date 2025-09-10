import { useState, useEffect } from 'react'
import { useSettings } from '../hooks/useSettings'
import { useOutletContext } from 'react-router-dom'
import { SettingsMap } from '../libs/types'
import { InfoCard } from './InfoCard'
import { useTranslation } from 'react-i18next'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { BaseButton } from '@/contexts/shared/components/Button'
import { HelpSquareIcon } from '@/contexts/shared/components/HugeIcons'

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
    <div className="space-y-4">
      <InfoCard
        title={t('dashboard.settings.google.analytics')}
        description={t('dashboard.settings.google.analytics_desc')}
      >
        <p className="mb-2 text-gray-700">{t('dashboard.settings.google.analytics_long_desc')}</p>
        <a
          href="https://support.google.com/analytics/answer/9304153"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded border bg-gray-50 p-2 hover:bg-gray-100"
        >
          <HelpSquareIcon className="size-8 text-gray-500" />
          <div>
            <p className="m-0 text-sm font-semibold">
              {t('dashboard.settings.one_signal.read_documentation')}
            </p>
            <p className="m-0 text-xs text-gray-500">
              {t('dashboard.settings.one_signal.read_documentation_desc')}
            </p>
          </div>
        </a>
      </InfoCard>

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
    </div>
  )
}
