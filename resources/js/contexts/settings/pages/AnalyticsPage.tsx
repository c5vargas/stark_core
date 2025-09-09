import { GoogleAnalyticsForm } from '../components/GoogleAnalyticsForm'

const AnalyticsPage: React.FC = () => {
  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="w-full max-w-full flex-0">
        <GoogleAnalyticsForm />
      </div>
    </div>
  )
}

export default AnalyticsPage
