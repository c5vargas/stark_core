import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { BaseButton } from '@/contexts/shared/components/Button'
import { useSettings } from '@/contexts/settings/hooks/useSettings'
import { SettingsMap } from '@/contexts/settings/libs/types'
import { useOutletContext } from 'react-router-dom'
import { Card } from '@/contexts/shared/components/ui/Card'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'

export const NotificationsForm: React.FC = () => {
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { t } = useTranslation()
  const { update } = useSettings()

  const [form, setForm] = useState({
    onesignal_app_id: '',
    onesignal_api_key: '',
    onesignal_safari_web_id: '',
  })

  useEffect(() => {
    if (settings) {
      setForm({
        onesignal_app_id: settings.onesignal_app_id || '',
        onesignal_api_key: settings.onesignal_api_key || '',
        onesignal_safari_web_id: settings.onesignal_safari_web_id || '',
      })
    }
  }, [settings])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    update(form)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label={t('dashboard.settings.one_signal.app_id')}>
          <InputText
            type="text"
            name="onesignal_app_id"
            value={form.onesignal_app_id}
            onChange={handleChange}
            placeholder="xs102855-d111-4b50-24e3-2f9bb78ddc70"
            autoComplete="off"
          />
        </FormField>

        <FormField label={t('dashboard.settings.one_signal.api_key')}>
          <InputText
            type="text"
            name="onesignal_api_key"
            value={form.onesignal_api_key}
            onChange={handleChange}
            placeholder="OGNiMjlkYTStODM5MF4Hu7aLWE5OWMtMmU5ZDQwOTliM2Rm"
            autoComplete="off"
          />
        </FormField>

        <FormField label={t('dashboard.settings.one_signal.safari_web_id')}>
          <InputText
            type="text"
            name="onesignal_safari_web_id"
            value={form.onesignal_safari_web_id}
            onChange={handleChange}
            placeholder="web.onesignal.auto.xs102855-d111-4b50-24e3-2f9bb78ddc70"
            autoComplete="off"
          />
        </FormField>

        <BaseButton
          type="submit"
          variant="primary"
          title={t('dashboard.settings.update')}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        />
      </form>
    </Card>
  )
}
