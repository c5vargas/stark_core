import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { useTranslation } from 'react-i18next'
import { CustomFieldsManagementForm } from '@/contexts/settings/components/CustomFieldsManagementForm'

const CustomFieldsPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full space-y-4">
        <InfoCard
          title={t('dashboard.settings.custom_fields')}
          description={t('dashboard.settings.custom_fields_desc')}
        >
          <p className="text-gray-700">{t('dashboard.settings.custom_fields_long_desc')}</p>
        </InfoCard>

        <CustomFieldsManagementForm />
      </div>
    </div>
  )
}

export default CustomFieldsPage
