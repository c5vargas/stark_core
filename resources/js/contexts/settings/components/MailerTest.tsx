import sendMailerTest from '@/contexts/settings/actions/sendTest'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { isErrorWithMessage } from '@/contexts/shared/libs/isErrorWithMessage'
import { useAlert } from '@/contexts/shared/contexts/AlertContext'
import { Card } from '@/contexts/shared/components/ui/Card'
import { InputText } from '@/contexts/shared/components/ui/form/InputText'
import { FormField } from '@/contexts/shared/components/ui/form/FormField'
import { BaseButton } from '@/contexts/shared/components/Button'

export const MailerTest: React.FC = () => {
  const { t } = useTranslation()
  const { showAlert } = useAlert()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { message } = await sendMailerTest(email)
      showAlert(message, 'success')
    } catch (error: unknown) {
      if (isErrorWithMessage(error)) {
        showAlert(error.message, 'error')
      } else {
        showAlert(t('alert.default.error'), 'error')
      }
    } finally {
      setLoading(false)
      setEmail('')
    }
  }

  return (
    <Card>
      <h6 className="mb-0 text-lg font-semibold">{t('dashboard.settings.mail_test')}</h6>
      <p className="mb-3 text-gray-500">{t('dashboard.settings.mail_test_desc')}</p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 md:flex-row md:items-end [&>div]:w-full">
          <FormField label={t('dashboard.settings.mail.from_address')}>
            <InputText
              name="mail_from_address"
              type="email"
              value={email}
              placeholder="example@test.com"
              onChange={e => setEmail(e.target.value)}
            />
          </FormField>

          <div>
            <BaseButton
              title={loading ? t('') : t('dashboard.settings.send')}
              variant="primary"
              type="submit"
              disabled={loading}
              className="flex items-center px-5"
            >
              {loading && (
                <>
                  <span
                    className="me-1 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent align-[-0.125em]"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Loading...</span>
                </>
              )}
            </BaseButton>
          </div>
        </div>
      </form>
    </Card>
  )
}
