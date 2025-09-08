import { MailSettingsForm } from '@/contexts/settings/components/MailSettingsForm'
import { MailerTest } from '../components/MailerTest'

const MailPage = () => {
  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="grid w-full max-w-full flex-0 grid-cols-1 gap-3">
        <MailSettingsForm />
        <MailerTest />
      </div>
    </div>
  )
}

export default MailPage
