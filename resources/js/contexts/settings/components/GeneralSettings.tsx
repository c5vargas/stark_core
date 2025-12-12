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
import { Card } from '@/contexts/shared/components/ui/Card'

const GeneralSettings: React.FC = () => {
  const { t } = useTranslation()
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { update, updating } = useSettings()

  const appUrl = String(import.meta.env.VITE_APP_URL || '')
  const [form, setForm] = useState<Partial<SettingsMap>>({
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
      app_color: settings.app_color || '',
    })
  }, [settings])

  return (
    <Card>
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
    </Card>
  )
}

export default GeneralSettings
