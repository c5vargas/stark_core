import { useTranslation } from 'react-i18next'
import { useUserPage } from '@/contexts/user/hooks/useUserPage'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { Card } from '@/contexts/shared/components/ui/Card'

const UserPage = () => {
  const { t } = useTranslation()
  const { user } = useUserPage()

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="space-y-4">
        <InfoCard
          title={
            user.id ? t('dashboard.users.h4', { user: user?.name }) : t('dashboard.users.h4.new')
          }
          description={t('dashboard.users.p', { user: user?.name })}
        ></InfoCard>

        <Card>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius minus voluptates rerum
          facilis eaque soluta, officia consequuntur facere, id fuga quod recusandae? Facere
          laudantium doloremque suscipit! Ipsum vero sed veritatis.
        </Card>
      </div>
    </div>
  )
}

export default UserPage
