import GeneralSettings from "../components/GeneralSettings";

const SettingsPage = () => {
	return (
    <div className="flex flex-wrap -mx-3">
      <div className="w-full max-w-full flex-0">
        <div className="bg-white border-0 shadow-xl rounded-2xl">
          <GeneralSettings />
        </div>
      </div>
    </div>
	);
}

export default SettingsPage
