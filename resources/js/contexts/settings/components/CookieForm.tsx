import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useOutletContext } from 'react-router-dom'
import { SettingsMap } from '@/contexts/settings/libs/types'
import { useSettings } from '@/contexts/settings/hooks/useSettings'
import { Editor } from '@/contexts/shared/components/ui/form/Editor'
import { OutputData } from '@editorjs/editorjs'
import { BaseButton } from '@/contexts/shared/components/Button'
import { ArrowRightIcon } from '@/contexts/shared/components/HugeIcons'
import Loading from '@/contexts/shared/components/Loading'

export const CookieForm: React.FC = () => {
  const { t } = useTranslation()
  const { settings } = useOutletContext<{ settings: SettingsMap }>()
  const { update } = useSettings()

  const [initialData, setInitialData] = useState<OutputData | undefined>()

  useEffect(() => {
    try {
      if (settings?.gdpr_cookies_page) {
        setInitialData(JSON.parse(settings.gdpr_cookies_page))
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

    update({
      gdpr_cookies_page: JSON.stringify(initialData),
    })
  }

  if (!initialData) return <Loading />

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <Editor data={initialData} onChange={handleChange} />

      <div className="flex items-center gap-4">
        <BaseButton
          title={t('dashboard.settings.update')}
          variant="primary"
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        />

        <a
          href="/cookies"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
        >
          {t('dashboard.settings.gdpr.gdpr_anchor')}
          <ArrowRightIcon />
        </a>
      </div>
    </form>
  )
}
