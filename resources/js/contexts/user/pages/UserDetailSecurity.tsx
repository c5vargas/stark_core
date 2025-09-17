import { useTranslation } from 'react-i18next'
import { useUserSecurity } from '@/contexts/user/hooks/useUserSecurity'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { Card } from '@/contexts/shared/components/ui/Card'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { BaseButton } from '@/contexts/shared/components/Button'

const UserDetailSecurity = () => {
  const { t } = useTranslation()
  const { user, password, loading, resetForm, handleChange, handleSubmit } = useUserSecurity()

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="space-y-4">
        <InfoCard
          title={t('dashboard.users.security.title', { user: user?.name })}
          description={t('dashboard.users.security.description')}
        >
          {t('dashboard.users.security.info')}
        </InfoCard>

        <Card>
          <form onSubmit={handleSubmit} className="flex items-center gap-4">
            <FormField label={t('dashboard.users.security.password')}>
              <InputText
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                placeholder={t('dashboard.users.security.password_placeholder')}
              />
            </FormField>

            <div className="mt-[28px] flex gap-3">
              <BaseButton
                title={t('dashboard.users.security.submit')}
                variant="primary"
                loading={loading}
                type="submit"
                className="h-[42px]"
              />

              <BaseButton
                title={t('dashboard.users.security.reset')}
                variant="secondary"
                loading={loading}
                type="button"
                onClick={resetForm}
              />
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default UserDetailSecurity
