import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { PrivacyForm } from '@/contexts/settings/components/PrivacyForm'
import { CookieForm } from '@/contexts/settings/components/CookieForm'
import { SegmentedControl } from '@/contexts/shared/components/ui/SegmentedControl'

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
      <SegmentedControl
        variant="brand"
        value={activeTab}
        onChange={v => setActiveTab(v as TabKey)}
        options={tabs.map(tab => ({ value: tab.key, label: tab.label }))}
      />

      <InfoCard title={currentTab?.label}>
        {tabs.find(tab => tab.key === activeTab)?.content}
      </InfoCard>
    </>
  )
}
