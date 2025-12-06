import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { PrivacyForm } from '@/contexts/settings/components/PrivacyForm'
import { CookieForm } from '@/contexts/settings/components/CookieForm'
import clsx from 'clsx'

type TabKey = 'cookies' | 'privacy'

export const GdprForm: React.FC = () => {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<TabKey>('cookies')

  const tabs: { key: TabKey; label: string; content: React.ReactNode }[] = [
    {
      key: 'cookies',
      label: t('dashboard.settings.gdpr.gdpr_cookies_page'),
      content: <CookieForm />,
    },
    {
      key: 'privacy',
      label: t('dashboard.settings.gdpr.gdpr_privacy_page'),
      content: <PrivacyForm />,
    },
  ]

  const currentTab = tabs.find(el => el.key === activeTab)

  return (
    <>
      <div className="mb-4 flex w-fit gap-3 rounded-lg bg-gray-100 p-1">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={clsx(
              'min-w-[260px] flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
              activeTab === key
                ? 'shadow-soft-md bg-gradient-to-tl from-purple-700 to-pink-500 text-white'
                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <InfoCard title={currentTab?.label}>
        {tabs.find(tab => tab.key === activeTab)?.content}
      </InfoCard>
    </>
  )
}
