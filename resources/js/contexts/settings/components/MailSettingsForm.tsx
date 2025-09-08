import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSettings } from '@/contexts/settings/hooks/useSettings'
import { SettingsMap } from '@/contexts/settings/libs/types'
import { useOutletContext } from 'react-router-dom'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { BaseButton } from '@/contexts/shared/components/Button'
import { InfoCard } from './InfoCard'
import { Card } from '@/contexts/shared/components/ui/Card'

export const MailSettingsForm = () => {
  const { t } = useTranslation()
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { update, updating } = useSettings()

  const [form, setForm] = useState<Partial<SettingsMap>>({
    mail_from_address: '',
    mail_contact_address: '',
    mail_from_name: '',
    mail_driver: '',
    mail_host: '',
    mail_port: '',
    mail_encryption: '',
    mail_username: '',
    mail_password: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    update(form)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!form) return
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  useEffect(() => {
    if (!settings) return

    setForm({
      mail_from_address: settings.app_mail_from_address || '',
      mail_contact_address: settings.mail_contact_address || '',
      mail_from_name: settings.mail_from_name || '',
      mail_driver: settings.mail_driver || '',
      mail_host: settings.mail_host || '',
      mail_port: settings.mail_port || '',
      mail_encryption: settings.mail_encryption || '',
      mail_username: settings.mail_username || '',
      mail_password: settings.mail_password || '',
    })
  }, [settings])

  return (
    <div className="grid grid-cols-1 space-y-4">
      <InfoCard
        title={t('dashboard.settings.mail')}
        description={t('dashboard.settings.mail_desc')}
      >
        <p>{t('dashboard.settings.mail_long_desc')}</p>
      </InfoCard>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label={t('dashboard.settings.mail.from_address')}>
            <InputText
              name="mail_from_address"
              type="email"
              value={form.mail_from_address}
              onChange={handleChange}
            />
          </FormField>

          <FormField label={t('dashboard.settings.mail.contact_address')}>
            <InputText
              name="mail_contact_address"
              type="email"
              value={form.mail_contact_address}
              onChange={handleChange}
            />
          </FormField>

          <FormField label={t('dashboard.settings.mail.from_name')}>
            <InputText
              name="mail_from_name"
              type="text"
              value={form.mail_from_name}
              onChange={handleChange}
            />
          </FormField>

          <hr className="my-4" />

          <FormField label={t('dashboard.settings.mail.driver')}>
            <Select name="mail_driver" value="SMTP" disabled>
              <option value="SMTP">SMTP</option>
            </Select>
          </FormField>

          <div className="flex w-full gap-3 [&>div]:w-full">
            <FormField label={t('dashboard.settings.mail.username')}>
              <InputText
                name="mail_username"
                type="text"
                value={form.mail_username}
                onChange={handleChange}
              />
            </FormField>

            <FormField label={t('dashboard.settings.mail.password')}>
              <InputText
                name="mail_password"
                type="password"
                value={form.mail_password}
                onChange={handleChange}
              />
            </FormField>
          </div>

          <div className="flex gap-3 [&>div]:w-full">
            <FormField label={t('dashboard.settings.mail.host')}>
              <InputText
                name="mail_host"
                type="text"
                value={form.mail_host}
                onChange={handleChange}
              />
            </FormField>

            <FormField label={t('dashboard.settings.mail.port')}>
              <InputText
                name="mail_port"
                type="text"
                value={form.mail_port}
                onChange={handleChange}
              />
            </FormField>

            <FormField label={t('dashboard.settings.mail.encryption')}>
              <Select name="mail_encryption" value={form.mail_encryption} onChange={handleChange}>
                <option value="">- Select -</option>
                <option value="TLS">TLS</option>
                <option value="SSL">SSL</option>
                <option value="STARTTLS">STARTTLS</option>
              </Select>
            </FormField>
          </div>

          <BaseButton
            title={t('dashboard.settings.update')}
            variant="primary"
            type="submit"
            loading={updating}
            className="mt-3"
          />
        </form>
      </Card>
    </div>
  )
}
