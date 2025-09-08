import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { SettingsMap } from '../libs/types'
import { useSettings } from '../hooks/useSettings'
import { BaseButton } from '@/contexts/shared/components/Button'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { Textarea } from '@/contexts/shared/components/ui/form/TextArea'
import { ColorInput } from '@/contexts/shared/components/ui/form/ColorInput'

const GeneralSettings: React.FC = () => {
  const { t } = useTranslation()
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { update, updating } = useSettings()

  const appUrl = import.meta.env.VITE_APP_URL
  const [form, setForm] = useState<SettingsMap>({
    app_name: '',
    app_descr: '',
    app_color: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    update(form)
  }

  useEffect(() => {
    if (!settings) return

    setForm({
      app_name: settings.app_name || '',
      app_descr: settings.app_descr || '',
      app_color: settings.app_color || '#000000',
    })
  }, [settings])

  return (
    <div className="grid grid-cols-1 space-y-4">
      <div className="rounded bg-white p-4 shadow">
        <h6 className="mb-0 text-lg font-semibold">{t('dashboard.settings.general')}</h6>
        <p className="mb-3 text-gray-500">{t('dashboard.settings.general_desc')}</p>
        <p className="text-gray-700">{t('dashboard.settings.general_long_desc')}</p>
      </div>

      <div className="rounded bg-white p-4 shadow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label={t('dashboard.settings.site_name')}>
            <InputText
              name="app_name"
              value={form.app_name}
              onChange={handleChange}
              placeholder={t('dashboard.settings.site_name')}
            />
          </FormField>

          <FormField label={t('dashboard.settings.site_url')}>
            <InputText value={appUrl} readOnly disabled />
          </FormField>

          <FormField label={t('dashboard.settings.site_descr')}>
            <Textarea name="app_descr" value={form.app_descr} onChange={handleChange} />
          </FormField>

          <FormField label={t('dashboard.settings.site_color')}>
            <ColorInput name="app_color" value={form.app_color} onChange={handleChange} />
          </FormField>

          <BaseButton
            title={t('dashboard.settings.update')}
            variant="primary"
            loading={updating}
            type="submit"
          />
        </form>
      </div>
    </div>
  )
}

export default GeneralSettings
