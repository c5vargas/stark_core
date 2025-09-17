import { useTranslation } from 'react-i18next'
import { useUserPage } from '@/contexts/user/hooks/useUserPage'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { Card } from '@/contexts/shared/components/ui/Card'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { useEffect, useState } from 'react'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { User, UserStatus } from '@/contexts/user/libs/types'
import { BaseButton } from '@/contexts/shared/components/Button'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { Textarea } from '@/contexts/shared/components/ui/form/TextArea'

const UserDetailPage = () => {
  const { t } = useTranslation()
  const { user } = useUserPage()

  const [form, setForm] = useState<Partial<User>>({
    name: '',
    username: '',
    email: '',
    avatar: '',
    status: undefined,
    metadata: undefined,
  })

  const statusOptions = Object.values(UserStatus).map(status => ({
    label: t(`dashboard.users.status.${status}`),
    value: status,
  }))

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // update(form)
  }

  useEffect(() => {
    if (!user) return
    setForm(user)
  }, [user])

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="space-y-4">
        <InfoCard
          title={
            user.id ? t('dashboard.users.h4', { user: user?.name }) : t('dashboard.users.h4.new')
          }
          description={t('dashboard.users.p', { user: user?.name })}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius minus voluptates rerum
          facilis eaque soluta, officia consequuntur facere, id fuga quod recusandae? Facere
          laudantium doloremque suscipit! Ipsum vero sed veritatis.
        </InfoCard>

        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label={t('dashboard.users.name')}>
              <InputText
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t('dashboard.users.name')}
              />
            </FormField>

            <FormField label={t('dashboard.users.username')}>
              <InputText
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder={t('dashboard.users.username')}
              />
            </FormField>

            <FormField label={t('dashboard.users.email')}>
              <InputText
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t('dashboard.users.email')}
              />
            </FormField>

            <FormField label={t('dashboard.users.status')}>
              <Select name="status" value={form.status} onChange={e => handleChange(e)}>
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label={t('dashboard.users.metadata')}>
              <Textarea
                value={form.metadata ? JSON.stringify(form.metadata) : ''}
                onChange={handleChange}
                placeholder={t('dashboard.users.metadata')}
              />
            </FormField>

            <BaseButton
              title={t('dashboard.users.update')}
              variant="primary"
              // loading={updating}
              type="submit"
            />
          </form>
        </Card>
      </div>
    </div>
  )
}

export default UserDetailPage
