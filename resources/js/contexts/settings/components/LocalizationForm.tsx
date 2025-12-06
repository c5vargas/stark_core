import { useEffect, useState } from 'react'
import phpTimezone from '@/contexts/settings/libs/phpTimezone'
import { useTranslation } from 'react-i18next'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { BaseButton } from '@/contexts/shared/components/Button'
import { Language, SettingsMap } from '@/contexts/settings/libs/types'
import { Checkbox } from '@/contexts/shared/components/ui/form/Checkbox'

interface LocalizationFormProps {
  languages?: Language[]
  onUpdate: (payload: Partial<SettingsMap>) => void
}

const app = window.AppConfig

export const LocalizationForm: React.FC<LocalizationFormProps> = ({ languages = [], onUpdate }) => {
  const { t } = useTranslation()

  const [form, setForm] = useState<Partial<SettingsMap>>({
    app_locale: '',
    app_timezone: '',
    app_translations: '0',
  })

  useEffect(() => {
    setForm({
      app_locale: app.app_locale,
      app_timezone: app.app_timezone,
      app_translations: app.app_translations,
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target.checked ? '1' : '0') : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdate(form)
  }

  return (
    <InfoCard title={t('dashboard.settings.localization')}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label={t('dashboard.settings.default_locale')}>
          <Select name="app_locale" value={form.app_locale || ''} onChange={handleChange} required>
            <option value="">{t('dashboard.settings.select')}</option>
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </Select>
          <small className="text-gray-500">{t('dashboard.settings.locale_desc')}</small>
        </FormField>

        <FormField label={t('dashboard.settings.default_timezone')}>
          <Select
            name="app_timezone"
            value={form.app_timezone || ''}
            onChange={handleChange}
            required
          >
            <option value="">{t('dashboard.settings.select')}</option>
            {phpTimezone.map(tz => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </Select>
          <small className="text-gray-500">{t('dashboard.settings.timezone_desc')}</small>
        </FormField>

        <FormField label={t('dashboard.settings.translations')}>
          <Checkbox
            name="app_translations"
            checked={form.app_translations === '1'}
            onChange={handleChange}
            label={t('dashboard.settings.translations_desc')}
          />
        </FormField>

        <BaseButton
          variant="primary"
          title={t('dashboard.settings.update')}
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        />
      </form>
    </InfoCard>
  )
}
