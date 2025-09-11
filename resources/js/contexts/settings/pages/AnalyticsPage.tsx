import { HelpSquareIcon } from '@/contexts/shared/components/HugeIcons'
import { DocumentationLink } from '@/contexts/settings/components/DocumentationLink'
import { GoogleAnalyticsForm } from '@/contexts/settings/components/GoogleAnalyticsForm'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { useTranslation } from 'react-i18next'

const AnalyticsPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="space-y-4">
        <InfoCard
          title={t('dashboard.settings.google.analytics')}
          description={t('dashboard.settings.google.analytics_desc')}
        >
          <p className="mb-2 text-gray-700">{t('dashboard.settings.google.analytics_long_desc')}</p>

          <DocumentationLink
            href="https://support.google.com/analytics/answer/9304153"
            title={t('dashboard.settings.one_signal.read_documentation')}
            description={t('dashboard.settings.one_signal.read_documentation_desc')}
            icon={<HelpSquareIcon className="size-8 text-gray-500" />}
          />
        </InfoCard>

        <GoogleAnalyticsForm />
      </div>
    </div>
  )
}

export default AnalyticsPage
