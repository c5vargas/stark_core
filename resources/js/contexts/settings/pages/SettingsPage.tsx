import GeneralSettings from '../components/GeneralSettings'

const SettingsPage = () => {
  return (
    <div className="-mx-3 flex flex-wrap">
      <div className="flex-0 w-full max-w-full">
        <div className="rounded-2xl border-0 bg-white shadow-xl">
          <GeneralSettings />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
