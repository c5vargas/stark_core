import clsx from 'clsx'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { PrivacyForm } from '@/contexts/settings/components/PrivacyForm'

export const GdprForm: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<'cookies' | 'privacy'>('cookies')

  const tabBaseClasses = 'border-b-2 px-3 py-2 text-sm font-medium whitespace-nowrap'

  return (
    <div className="space-y-4">
      <InfoCard
        title={t('dashboard.settings.gdpr')}
        description={t('dashboard.settings.gdpr_desc')}
      >
        <p className="text-gray-700">{t('dashboard.settings.gdpr_long_desc')}</p>
      </InfoCard>

      <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4">
            <button
              onClick={() => setActiveTab('cookies')}
              className={clsx(
                tabBaseClasses,
                activeTab === 'cookies'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {t('dashboard.settings.gdpr.gdpr_cookies_page')}
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={clsx(
                tabBaseClasses,
                activeTab === 'privacy'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {t('dashboard.settings.gdpr.gdpr_privacy_page')}
            </button>
          </nav>
        </div>

        <div className="mt-4">
          {activeTab === 'cookies' && <PrivacyForm />}
          {activeTab === 'privacy' && <PrivacyForm />}
        </div>
      </div>
    </div>
  )
}
