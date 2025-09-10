import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { SettingsMap } from '@/contexts/settings/libs/types'
import { useSettings } from '@/contexts/settings/hooks/useSettings'
import { Editor } from '@/contexts/shared/components/ui/form/Editor'
import { OutputData } from '@editorjs/editorjs'
import { BaseButton } from '@/contexts/shared/components/Button'

export const PrivacyForm: React.FC = () => {
  const { t } = useTranslation()
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { update } = useSettings()

  const [initialData, setInitialData] = useState<OutputData | undefined>()

  useEffect(() => {
    try {
      if (settings?.gdpr_privacy_page) {
        setInitialData(JSON.parse(settings.gdpr_privacy_page))
      }
    } catch {
      setInitialData(undefined)
    }
  }, [settings])

  const handleChange = (newVal: OutputData) => {
    setInitialData(newVal)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('CMOOOON')
    update({
      gdpr_privacy_page: JSON.stringify(initialData),
    })
  }

  return (
    <div className="rounded bg-white p-4 shadow">
      <h6 className="mb-4 text-lg font-semibold">
        {t('dashboard.settings.gdpr.gdpr_privacy_page')}
      </h6>

      <form onSubmit={handleSubmit} className="space-y-4">
        {initialData && <Editor data={initialData} onChange={handleChange} />}

        <div className="flex items-center gap-4">
          <BaseButton
            title={t('dashboard.settings.update')}
            variant="primary"
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          />

          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            {t('dashboard.settings.gdpr.gdpr_anchor')}
            <i className="bi bi-arrow-right" />
          </a>
        </div>
      </form>
    </div>
  )
}
