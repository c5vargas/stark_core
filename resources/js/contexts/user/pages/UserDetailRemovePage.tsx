import destroyUserById from '@/contexts/user/actions/destroyUserById'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { BaseButton } from '@/contexts/shared/components/Button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useUserPage } from '@/contexts/user/hooks/useUserPage'
import { Switch } from '@/contexts/shared/components/ui/form/Switch'
import { Card } from '@/contexts/shared/components/ui/Card'

const UserDetailRemovePage = () => {
  const navigate = useNavigate()
  const { user } = useUserPage()
  const { t } = useTranslation()

  const [confirmed, setConfirmed] = useState(false)

  const handleToggleConfirm = () => setConfirmed(prev => !prev)

  const handleDelete = async () => {
    if (!confirmed) return

    const isDeleted = await destroyUserById({ userId: user.id })
    if (isDeleted) navigate('/dashboard/users')
  }

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="space-y-4">
        <InfoCard
          title={t('dashboard.users.delete.h5')}
          description={t('dashboard.users.delete.descr')}
        >
          <p>{t('dashboard.users.delete.p')}</p>
        </InfoCard>

        <Card>
          <div className="flex-auto items-center justify-between sm:flex">
            <div className="mb-6 flex items-center sm:mb-0">
              <Switch checked={confirmed} onChange={handleToggleConfirm} />
              <div className="ml-2">
                <span className="block text-sm font-semibold text-slate-700">
                  {t('dashboard.users.delete.confirm.title')}
                </span>
                <span className="block text-xs">{t('dashboard.users.delete.confirm.text')}</span>
              </div>
            </div>

            <BaseButton
              variant="primary"
              disabled={!confirmed}
              title={t('dashboard.users.delete.btn')}
              onClick={handleDelete}
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default UserDetailRemovePage
