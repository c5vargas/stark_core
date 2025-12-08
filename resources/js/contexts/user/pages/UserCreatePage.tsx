import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Layout from '@/contexts/shared/components/Layout'
import { InfoCard } from '@/contexts/settings/components/InfoCard'
import { Card } from '@/contexts/shared/components/ui/Card'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { User, UserStatus } from '@/contexts/user/libs/types'
import { BaseButton } from '@/contexts/shared/components/Button'
import { Select } from '@/contexts/shared/components/ui/form/Select'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import createUser from '@/contexts/user/actions/createUser'
import { useCustomFields } from '@/contexts/user/hooks/useCustomFields'
import { CustomFieldsForm } from '@/contexts/user/components/CustomFieldsForm'

const UserCreatePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { showAlert } = useAlert()
  const { fields: customFields } = useCustomFields()

  const [form, setForm] = useState<Partial<User>>({
    name: '',
    username: '',
    email: '',
    password: '',
    avatar: '',
    status: UserStatus.PENDING,
  })

  const [customFieldValues, setCustomFieldValues] = useState<Record<string, unknown>>({})

  const statusOptions = Object.values(UserStatus).map(status => ({
    label: t(`dashboard.users.status.${status}`),
    value: status,
  }))

  const { mutateAsync: create, isPending: creating } = useMutation({
    mutationFn: (payload: Partial<User>) => createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      showAlert(t('controller.user.created'), 'success')
      navigate('/dashboard/users')
    },
    onError: (err: Error) => showAlert(err.message, 'error'),
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payload: Partial<User> & { custom_fields?: Record<string, unknown> } = {
      ...form,
    }
    if (Object.keys(customFieldValues).length > 0) {
      payload.metadata = customFieldValues
    }
    create(payload)
  }

  return (
    <Layout pageTitle={t('dashboard.users.create')}>
      <div className="-mx-3 flex flex-wrap">
        <div className="w-full space-y-4">
          <InfoCard title={t('dashboard.users.h4.new')} description={t('dashboard.users.descr')} />

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField label={t('dashboard.users.name')}>
                <InputText
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t('dashboard.users.name')}
                  required
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
                  required
                />
              </FormField>

              <FormField label={t('common.password')}>
                <InputText
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={t('common.password')}
                  required
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

              {customFields.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">{t('dashboard.users.custom_fields')}</h3>
                  <CustomFieldsForm
                    fields={customFields}
                    values={customFieldValues}
                    onChange={setCustomFieldValues}
                  />
                </div>
              )}

              <div className="flex gap-3">
                <BaseButton
                  title={t('dashboard.users.create')}
                  variant="primary"
                  loading={creating}
                  type="submit"
                />
                <BaseButton
                  title={t('buttons.cancel')}
                  variant="secondary"
                  type="button"
                  onClick={() => navigate('/dashboard/users')}
                />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

export default UserCreatePage
