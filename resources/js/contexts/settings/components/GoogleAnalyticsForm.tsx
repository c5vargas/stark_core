import { useState, useEffect } from 'react'
import { useSettings } from '@/contexts/settings/hooks/useSettings'
import { useOutletContext } from 'react-router-dom'
import { SettingsMap } from '@/contexts/settings/libs/types'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { useTranslation } from 'react-i18next'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { InputFile } from '@/contexts/shared/components/ui/form/InputFile'
import { BaseButton } from '@/contexts/shared/components/Button'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import handleHttpError from '@/contexts/shared/libs/handleHttpError'

export const GoogleAnalyticsForm: React.FC = () => {
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { t } = useTranslation()
  const { update, updating } = useSettings()
  const queryClient = useQueryClient()
  const { showAlert } = useAlert()

  const [form, setForm] = useState<Partial<SettingsMap>>({
    analytics_property_id: '',
    manager_measurement_id: '',
  })
  const [accountKeyFile, setAccountKeyFile] = useState<File | null>(null)

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAccountKeyFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (accountKeyFile) {
        const formData = new FormData()

        Object.keys(form).forEach(key => {
          const value = form[key as keyof SettingsMap]
          if (value !== undefined && value !== null && value !== '') {
            formData.append(key, String(value))
          }
        })

        formData.append('account_key', accountKeyFile)

        await axios.post('/api/settings', formData, { withCredentials: true })
        queryClient.invalidateQueries({ queryKey: ['settings'] })
        showAlert(t('controller.updated'), 'success')
        setAccountKeyFile(null)
      } else {
        await update(form)
      }
    } catch (error: unknown) {
      const errorMessage = handleHttpError(error)
      showAlert(errorMessage, 'error')
    }
  }

  return (
    <InfoCard>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label={t('dashboard.settings.google.account_key')}
          helperText={t('dashboard.settings.google.account_key_desc')}
        >
          <InputFile
            name="account_key"
            accept=".json,application/json"
            onChange={handleFileChange}
          />
        </FormField>

        <FormField
          label={t('dashboard.settings.google.analytics_property')}
          helperText={t('dashboard.settings.google.analytics_property_desc')}
        >
          <InputText
            type="text"
            name="analytics_property_id"
            placeholder="123456789"
            value={form.analytics_property_id}
            onChange={handleChange}
          />
        </FormField>

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

        <BaseButton
          title={t('dashboard.settings.update')}
          variant="primary"
          type="submit"
          disabled={updating}
        />
      </form>
    </InfoCard>
  )
}
