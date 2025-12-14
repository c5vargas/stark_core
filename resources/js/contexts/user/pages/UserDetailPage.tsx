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
import { CustomFieldsForm } from '@/contexts/user/components/CustomFieldsForm'
import { useCustomFields } from '@/contexts/user/hooks/useCustomFields'

const UserDetailPage = () => {
  const { t } = useTranslation()
  const { user, update, updating } = useUserPage()
  const { fields: customFields } = useCustomFields()

  const [form, setForm] = useState<Partial<User>>({
    name: '',
    username: '',
    email: '',
    avatar: '',
    status: undefined,
  })

  const [customFieldValues, setCustomFieldValues] = useState<Record<string, unknown>>({})

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
    const payload: Omit<Partial<User>, 'custom_fields'> & {
      custom_fields?: Record<string, unknown>
    } = {
      ...form,
    } as Omit<Partial<User>, 'custom_fields'> & { custom_fields?: Record<string, unknown> }
    delete (payload as Partial<User>).custom_fields
    if (Object.keys(customFieldValues).length > 0) {
      payload.custom_fields = customFieldValues
    }
    update(payload as Partial<User>)
  }

  useEffect(() => {
    if (!user) return

    setForm({
      ...user,
      name: user.name ?? '',
      username: user.username ?? '',
      email: user.email ?? '',
      avatar: user.avatar ?? '',
    })

    const values: Record<string, unknown> = {}
    if (user.custom_fields && user.custom_fields.length > 0) {
      user.custom_fields.forEach(field => {
        if (field.value !== null && field.value !== undefined && field.custom_field?.name) {
          values[field.custom_field.name] = field.value
        }
      })
    }
    setCustomFieldValues(values)
  }, [user])

  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full space-y-4">
        <InfoCard
          title={
            user.id ? t('dashboard.users.h4', { user: user?.name }) : t('dashboard.users.h4.new')
          }
          description={t('dashboard.users.descr')}
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card>
            <div className="mb-4">
              <h3 className="m-0 text-lg font-semibold text-gray-900">
                {t('dashboard.users.basic_info')}
              </h3>
            </div>
            <div className="space-y-4">
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

              <div className="flex justify-end">
                <BaseButton
                  title={t('dashboard.users.update')}
                  variant="primary"
                  loading={updating}
                  type="submit"
                />
              </div>
            </div>
          </Card>

          {customFields.length > 0 && (
            <Card>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {t('dashboard.users.custom_fields')}
                </h3>
              </div>
              <CustomFieldsForm
                fields={customFields}
                values={customFieldValues}
                onChange={setCustomFieldValues}
              />

              <div className="mt-4 flex justify-end">
                <BaseButton
                  title={t('dashboard.users.update')}
                  variant="primary"
                  loading={updating}
                  type="submit"
                />
              </div>
            </Card>
          )}
        </form>
      </div>
    </div>
  )
}

export default UserDetailPage
