import { GdprForm } from '@/contexts/settings/components/GdprForm'

const GdprPage: React.FC = () => {
  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full max-w-full flex-0">
        <GdprForm />
      </div>
    </div>
  )
}

export default GdprPage
